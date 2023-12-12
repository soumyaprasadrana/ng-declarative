import { resolve } from "path";
import { Logger } from "../logger/logger";
import { processAttributes, processChildren } from "./utils";
import { reject } from "lodash";

export async function transformBase(metadata: any, node: any, compiler: any) {
  return new Promise(async (resolve, reject) => {
    const METHOD = "transform";
    try {
      //Logger.debug(METHOD + " :: Metadata", metadata);
      const nodeName = Object.keys(node)[0];
      //console.log("===== DEBUG BEFORE PROCESS ATTRIBUTES");
      const attributes = await processAttributes(
        metadata.attributes,
        node,
        metadata,
        compiler
      );
      //console.log("===== DEBUG AFTER PROCESS ATTRIBUTES");
      //Logger.debug("Attributes", attributes);

      const children = await processChildren(node[nodeName], compiler, node);
      // console.log("Children ", children);
      const templateS = `<${metadata.declarativeComponentTag} ${attributes}>${children}</${metadata.declarativeComponentTag}>`;
      Logger.debug(METHOD + " :: templateS", templateS);

      resolve(templateS);
    } catch (err0r) {
      //console.log("DEBUG CATCH ERROR TRANFORM BASE", err0r);
      reject(err0r);
    }
  });

}
