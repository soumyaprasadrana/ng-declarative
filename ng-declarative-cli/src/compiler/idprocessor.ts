import * as fs from "fs";
import * as xml2js from "xml2js";
import { Logger } from "../logger/logger";

export class IDProcessor {
  private generatedIDs: Set<string> = new Set();

  constructor(private filePath: string) {}

  processIDs() {
    // Read the XML file
    const xmlString = fs.readFileSync(this.filePath, "utf-8");

    // Parse XML to JavaScript object
    xml2js.parseString(xmlString, (err, result) => {
      if (err) {
        Logger.error("Error parsing XML:", err);
        return;
      }

      // Process IDs in the resulting object
      this.processIDsRecursively(result[Object.keys(result)[0]]);

      // Convert the modified object back to XML
      const builder = new xml2js.Builder();
      const updatedXml = builder.buildObject(result);

      // Save the updated XML back to the file
      fs.writeFileSync(this.filePath, updatedXml, "utf-8");
      Logger.log("Updated XML saved to file.");
    });
  }

  private processIDsRecursively(node: any) {
    // Check if the current node has an 'id' attribute
    if (!node.$ || !node.$.id) {
      // If no 'id' attribute, generate a unique random one
      const generatedID = this.generateUniqueID();
      node.$ = node.$ || {};
      node.$.id = generatedID;
      Logger.log(`Processed, generated a new id 'id': ${generatedID}`);
    } else {
      // Check for duplicate IDs
      const existingID = node.$.id;
      if (this.generatedIDs.has(existingID)) {
        throw new Error(`Duplicate ID found: ${existingID}`);
      }
      Logger.log(`Processed, existing 'id': ${existingID}`);
      this.generatedIDs.add(existingID);
    }

    // Process children of the current node dynamically
    Object.entries(node).forEach(([ key, value ]) => {
      if (Array.isArray(value)) {
        // If the property is an array, process each element
        value.forEach((child: any) => {
          this.processIDsRecursively(child);
        });
      }
    });
  }

  private generateUniqueID(): string {
    let generatedID = this.randomAlphanumeric(7);
    while (this.generatedIDs.has(generatedID)) {
      generatedID = this.randomAlphanumeric(7);
    }
    this.generatedIDs.add(generatedID);
    return generatedID;
  }

  private randomAlphanumeric(length: number): string {
    const alphanumericChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += alphanumericChars.charAt(
        Math.floor(Math.random() * alphanumericChars.length)
      );
    }
    console.log(`Generated random alphanumeric: ${result}`);
    return result;
  }
}
