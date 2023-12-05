import { Logger } from "../logger/logger";
import { processChildren } from "./utils";

export async function transform(metadata: any, node: any, compiler: any) {
  const METHOD = "transform";
  function processAttributes(attributes: any, node: any, metadata: any) {
    const METHOD = "processAttributes";
    const tagName = Object.keys(node)[0];
    //Logger.debug("Attributes", attributes);
    Logger.debug(tagName);
    Logger.debug(node);
    Logger.debug(node[tagName].$);
    /* const requiredAttributes = metadata.attributes
       .filter((obj: { required: any }) => obj.required)
       .map((obj: { name: any }) => obj.name);
     Logger.debug(METHOD + " :: requiredAttributes", requiredAttributes);*/

    const requiredAttributes = metadata.attributes
      .filter(
        (obj: { required: any; requiredIf: any; requiredIfAttributeNotPresent: any; }) =>
          obj.required || obj.requiredIf || obj.requiredIfAttributeNotPresent
      )
      .map((obj: { name: any; requiredIf: any; requiredIfAttributeNotPresent: any; }) => {
        if (obj.requiredIf) {
          // Check if the requiredIf condition is met
          const [attributeName, operator, value] = obj.requiredIf.match(/(.+?)(==|===|!=|!==)(.+)/)?.slice(1) || [];
          const attributeValue = node[tagName].$[attributeName];
          Logger.debug("DEBUG", attributeName, operator, value);
          Logger.debug("DEBUG", obj.requiredIf);
          // Evaluate the expression
          const conditionMet =
            operator === "=="
              ? attributeValue == value
              : operator === "==="
                ? attributeValue === value
                : operator === "!="
                  ? attributeValue != value
                  : operator === "!==" ? attributeValue !== value : false;

          return conditionMet ? obj.name : null;
        }
        else if (obj.requiredIfAttributeNotPresent) {
          if (Array.isArray(obj.requiredIfAttributeNotPresent)) {
            let result = true;
            for (let item of obj.requiredIfAttributeNotPresent) {
              if (node[tagName].$.hasOwnProperty(item)) {
                result = false;
              }
            }
            if (result) return obj.name;
            else return null;
          }
          else
            return node[tagName].$.hasOwnProperty(obj.requiredIfAttributeNotPresent) ? null : obj.name;
        }
        else {
          return obj.name;
        }
      })
      .filter((name: any) => name !== null);

    Logger.log(
      METHOD + " :: requiredAttributes",
      requiredAttributes
    );

    const missingAttributes = requiredAttributes.filter(
      (key: any) => !node[tagName].$.hasOwnProperty(key)
    );

    if (missingAttributes.length === 0) {
      console.log("All required attributes have values.");
    } else {
      console.log(
        `Missing values for required attributes: ${missingAttributes.join(
          ", "
        )} for tag ${tagName}`
      );
      throw new Error(
        `Missing values for required attributes: ${missingAttributes.join(
          ", "
        )} for tag ${tagName}`
      );
    }

    return Object.entries(node[tagName].$)
      .filter(([key]) =>
        attributes.some((attr: { name: string }) => attr.name === key)
      ) // Only include attributes present in the metadata
      .map(([key, value]) => {
        let dom: any = {};
        const attribute = attributes.find(
          (attr: { name: string }) => attr.name === key
        );


        let valueString: string = "" + value;
        dom["key"] = key;
        dom["value"] = attribute.transform ? attribute.transform(value) : value;
        dom["isBinding"] = false;
        if (valueString.startsWith("app.")) {
          dom["isBinding"] = true;
          dom["appBinding"] = true;
        } else if (valueString.startsWith("appCtrl.") || valueString.startsWith("routeCtrl.")) {
          dom["controllerBinding"] = true;
          dom["isBinding"] = true;
        }

        return dom;
      });
  }
  //Logger.debug(METHOD + " :: Metadata", metadata);
  const nodeName = Object.keys(node)[0];

  const attributes = processAttributes(metadata.attributes, node, metadata);
  //Logger.debug("Attributes", attributes);

  const children = await processChildren(node[nodeName], compiler, node);

  //console.log("Children ", children);
  console.log("Attributes ", attributes);
  const id = compiler.getAttributeFromNode(node, "id");
  const items = compiler.getAttributeFromNode(node, "items");
  compiler.addLoop({
    id: id,
    attributes: attributes,
    template: `${children.toString().replace(/(>,+<)/g, "><").replace(/,</g, "<")}`,
    component: "Loop" + id,
    iteratable: items,
    route: compiler.getCurrentRoute()
  });

  return `<app-loop-${id}/>`;
}


