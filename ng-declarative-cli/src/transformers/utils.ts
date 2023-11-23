import { Logger } from "../logger/logger";

export function processAttributes(
  attributes: any,
  node: any,
  metadata: any
): string {
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
      (obj: { required: any; requiredIf: any; requiredIfAttributeNotPresent:any; }) =>
        obj.required || obj.requiredIf || obj.requiredIfAttributeNotPresent
    )
    .map((obj: { name: any; requiredIf: any; requiredIfAttributeNotPresent:any; }) => {
      if (obj.requiredIf) {
        // Check if the requiredIf condition is met
       const [ attributeName, operator, value ] = obj.requiredIf.match(/(.+?)(==|===|!=|!==)(.+)/)?.slice(1) || [];
        const attributeValue = node[tagName].$[attributeName];
        Logger.log("DEBUG", attributeName, operator, value);
        Logger.log("DEBUG", obj.requiredIf);
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
      else if(obj.requiredIfAttributeNotPresent){
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
    .filter(([ key ]) =>
      attributes.some((attr: { name: string }) => attr.name === key)
    ) // Only include attributes present in the metadata
    .map(([ key, value ]) => {
    let dom =``;
      const attribute = attributes.find(
        (attr: { name: string }) => attr.name === key
      );
      if(attribute.objectbinding){
        dom = `${attribute
        ? `[${attribute.mappedInputAttribute}]`
        : `[${key}]`}="${attribute.transform ? attribute.transform(value) : value}"`;
      }
      else if(exports.isBindingString(value)){
        dom = `${attribute
        ? `[${attribute.mappedInputAttribute}]`
        : `[${key}]`}="${exports.removeBindingCharacters(value)}"`;
      }
      else{
      dom =
      `${attribute
        ? attribute.mappedInputAttribute
        : key}="${attribute.transform ? attribute.transform(value) : value}"`;
      }
      return dom;
    })
    .join(" ");
}
export function removeBindingCharacters(str: string): string {
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

export async function processChildren(children: any, compiler: any,parentNode:any) {
  const METHOD = "processChildren";
  Logger.debug(METHOD + " :: entry ");
  Logger.debug(METHOD + " :: children ::", children);

  // Use Promise.all to wait for all asynchronous operations and collect the results
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
          return compiler.processNode(child,parentNode);
        }
      }
    })
  );

  // Flatten the array of results
  return results.flat();
}
