import { Logger } from "../logger/logger";
import { processAttributes, processChildren } from "./utils";

export async function transformBase(metadata: any, node: any, compiler: any) {
  const METHOD = "transform";
  //Logger.debug(METHOD + " :: Metadata", metadata);
  const nodeName = Object.keys(node)[0];

  const attributes = processAttributes(metadata.attributes, node, metadata);
  //Logger.debug("Attributes", attributes);

  const children = await processChildren(node[nodeName], compiler, node);
  console.log("Children ", children);
  const templateS = `<${metadata.declarativeComponentTag} ${attributes}>${children}</${metadata.declarativeComponentTag}>`;
  Logger.debug(METHOD + " :: templateS", templateS);

  return templateS;
}
