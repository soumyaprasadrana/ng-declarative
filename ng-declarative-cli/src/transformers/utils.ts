import { Logger } from "../logger/logger";

export function processAttributes(
  attributes: any,
  node: any,
  metadata: any,
  compiler: any
): string {
  const METHOD = "processAttributes";
  const tagName = Object.keys(node)[0];
  //Logger.debug("Attributes", attributes);
  Logger.debug(tagName);
  Logger.debug(node);
  Logger.debug(node[tagName].$);
  const id = compiler.getAttributeFromNode(node, "id");
  /* const requiredAttributes = metadata.attributes
     .filter((obj: { required: any }) => obj.required)
     .map((obj: { name: any }) => obj.name);
   Logger.debug(METHOD + " :: requiredAttributes", requiredAttributes);*/

  const requiredAttributes = metadata.attributes
    .filter(
      (obj: { required: any; requiredIf: any; requiredIfAttributeNotPresent: any; requiredIfAttributePresent: any; }) =>
        obj.required || obj.requiredIf || obj.requiredIfAttributeNotPresent || obj.requiredIfAttributePresent
    )
    .map((obj: { name: any; requiredIf: any; requiredIfAttributeNotPresent: any; requiredIfAttributePresent: any; }) => {
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
        return node[tagName].$.hasOwnProperty(obj.requiredIfAttributeNotPresent) ? null : obj.name;
      }
      else if (obj.requiredIfAttributePresent) {
        return node[tagName].$.hasOwnProperty(obj.requiredIfAttributePresent) ? obj.name : null;
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

  let attrs = Object.entries(node[tagName].$)
    .filter(([key]) =>
      attributes.some((attr: { name: string }) => attr.name === key)
    ) // Only include attributes present in the metadata
    .map(([key, value]) => {
      let dom = ``;
      const attribute = attributes.find(
        (attr: { name: string }) => attr.name === key
      );

      if (attribute.validate) {
        if (!attribute.validate(value)) {
          throw new Error(`Invalid value for attribute ${attribute.name} in component ${compiler.getAttributeFromNode(node, "id")}. Value values are [${attribute.allowedValues}]`)
        }
      }

      if (attribute.objectbinding) {
        if (exports.isBindingString(value)) {
          value = exports.removeBindingCharacters(value);
        }
        dom = `${attribute
          ? `[${attribute.mappedInputAttribute}]`
          : `[${key}]`}="${attribute.transform ? attribute.transform(value) : value}"`;
      } else if (attribute.twowaybinding) {
        if (exports.isBindingString(value)) {
          value = exports.removeBindingCharacters(value);
        }
        dom = `${attribute
          ? `[(${attribute.mappedInputAttribute})]`
          : `[(${key})]`}="${attribute.transform ? attribute.transform(value) : value}"`;
      }
      else if (exports.isBindingString(value)) {
        if (attribute.bindingtransform) {
          if (attribute.bindingkeytransform) {
            dom = `${attribute
              ? `${attribute.bindingkeytransform(attribute.mappedInputAttribute, attribute.bindingtransform(value))}`
              : `${attribute.bindingkeytransform(key, attribute.bindingtransform(value))}`}="${attribute.bindingtransform(value)}"`;
          } else
            dom = `${attribute
              ? `[${attribute.mappedInputAttribute}]`
              : `[${key}]`}="${attribute.bindingtransform(value)}"`;
        } else {
          dom = `${attribute
            ? `[${attribute.mappedInputAttribute}]`
            : `[${key}]`}="${exports.removeBindingCharacters(value)}"`;
        }
      }
      else {
        dom =
          `${attribute
            ? attribute.mappedInputAttribute
            : key}="${attribute.transform ? attribute.transform(value) : value}"`;
      }
      return dom;
    })
    .join(" ");

  let directives = attributes.filter((obj: any) => { return obj.type === "directive" })
    .map((obj: any) => { return obj.linkattributevalue ? `${obj.name}="${compiler.getAttributeFromNode(node, obj.linkattributevalue)}"` : obj.name })
    .join(" ");

  let defaultValues = attributes
    .filter((obj: any) => {
      return obj.defaultValue && !node[tagName].$.hasOwnProperty(obj.name);
    })
    .map((attribute: any) => {
      if (attribute.objectbinding) {
        return `[${attribute
          ? attribute.mappedInputAttribute
          : attribute.name}]="${attribute?.transform ? attribute.transform(attribute.defaultValue) : attribute.defaultValue
          }"`;
      }
      else if (attribute.twowaybinding) {
        return `[(${attribute
          ? attribute.mappedInputAttribute
          : attribute.name})]="${attribute?.transform ? attribute.transform(attribute.defaultValue) : attribute.defaultValue
          }"`;
      }
      else {
        return `${attribute
          ? attribute.mappedInputAttribute
          : attribute.name}="${attribute?.transform ? attribute.transform(attribute.defaultValue) : attribute.defaultValue
          }"`;
      }
    })
    .join(" ");

  if (directives) {
    attrs = attrs + " " + directives;
  }
  if (defaultValues) {
    attrs = attrs + " " + defaultValues;
  }

  // Adding ID Ref to host elements 
  if (!attrs.includes("#" + id)) {
    attrs = attrs + " " + "#" + id
  }



  return attrs;

}
export function removeBindingCharacters(str: any): string {
  const bindingCharacters = "%%";

  if (str.startsWith(bindingCharacters) && str.endsWith(bindingCharacters)) {
    // Remove the binding characters from the start and end
    return str.slice(bindingCharacters.length, -bindingCharacters.length);
  }

  // Return the original string if it doesn't have the expected binding characters
  return str;
}

export function isBindingString(str: string): boolean {
  return str.startsWith("%%") && str.endsWith("%%");
}

export async function processChildren(children: any, compiler: any, parentNode: any) {
  const METHOD = "processChildren";
  Logger.debug(METHOD + " :: entry ");
  Logger.debug(METHOD + " :: children ::", children);

  /* // Use Promise.all to wait for all asynchronous operations and collect the results
  const results = await Promise.all(
    Object.keys(children).map(async (childName) => {
      if (Array.isArray(children[childName])) {
        // Check if there are multiple identical children
        if (children[childName].length > 1) {
          // If there are multiple identical children, process each one
          return await Promise.all(
            children[childName].map(async (child: any) => {
              console.log(`Child ${childName}:`, child);
              // Wait for the asynchronous operation to complete and return the result
              return await compiler.processNode({ [childName]: child },parentNode);
            })
          );
        } else {
          // If there is only one child, process it directly
          const child = { [childName]: children[childName][0] };
          console.log(`Child ${childName}:`, child);
          // Wait for the asynchronous operation to complete and return the result
          return await compiler.processNode(child,parentNode);
        }
      }
    })
  ); */
  async function processChildrenSynchronously(children: any, parentNode: any) {
    const results = [];

    for (const childName of Object.keys(children)) {
      if (Array.isArray(children[childName])) {
        if (children[childName].length > 1) {
          for (const child of children[childName]) {
            // console.log(`Child ${childName}:`, child);
            const result = await compiler.processNode({ [childName]: child }, parentNode);
            results.push(result);
          }
        } else {
          const child = { [childName]: children[childName][0] };
          // console.log(`Child ${childName}:`, child);
          const result = await compiler.processNode(child, parentNode);
          results.push(result);
        }
      }
    }

    return results;
  }
  const synchronousResults = await processChildrenSynchronously(children, parentNode);

  // Flatten the array of results
  return synchronousResults;
}
