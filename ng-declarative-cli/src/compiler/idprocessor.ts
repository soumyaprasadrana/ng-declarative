import * as fs from "fs";
import * as xmlParser from "fast-xml-parser";
import { Logger } from "../logger/logger";

export class IDProcessor {
  private generatedIDs: Set<string> = new Set();
  private idsModified: boolean = false;

  constructor(private filePath: string) { }

  processIDs() {
    // Read the XML file
    const xmlString = fs.readFileSync(this.filePath, "utf-8");

    // Parse XML to JavaScript object

    const result = new xmlParser.XMLParser({ commentPropName: "#comment", preserveOrder: true, ignoreAttributes: false }).parse(xmlString);

    // Process IDs in the resulting object
    this.processIDsRecursively(result[Object.keys(result)[0]]);

    if (this.idsModified) {
      // Convert the modified object back to XML manually

      const updatedXml = new xmlParser.XMLBuilder({ commentPropName: "#comment", preserveOrder: true, ignoreAttributes: false, suppressEmptyNode: false, format: true }).build(result);

      // Save the updated XML back to the file
      fs.writeFileSync(this.filePath, updatedXml, "utf-8");
      Logger.log("Updated XML saved to file.");
    } else {
      Logger.log("File processed, no new id added.");
    }
  }

  private processIDsRecursively(node: any) {
    if (Object.keys(node)[0] == "#comment")
      return;
    // Check if the current node has an 'id' attribute
    if (!node[':@'] || !node[':@']["@_id"]) {
      // If no 'id' attribute, generate a unique random one
      const generatedID = this.generateUniqueID();
      node[':@'] = node[':@'] || {};
      node[':@']["@_id"] = generatedID;
      Logger.log(`Processed, generated a new id 'id': ${generatedID}`);
      this.idsModified = true;
    } else {
      // Check for duplicate IDs
      const existingID = node[':@']["@_id"];
      if (this.generatedIDs.has(existingID)) {
        throw new Error(`Duplicate ID found: ${existingID}`);
      }
      Logger.log(`Processed, existing 'id': ${existingID}`);
      this.generatedIDs.add(existingID);
    }

    //console.log("==> DEBUG ==> ProcessNode ++", node);
    if (Array.isArray(node[Object.keys(node)[0]])) {
      for (var item of node[Object.keys(node)[0]]) {
        //console.log("==> DEBUG ==> ProcessNode ++", item);
        this.processIDsRecursively(item);
      }
    }


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
    const alphabetChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numericChars = "0123456789";

    // Ensure the first character is an alphabet
    let result = alphabetChars.charAt(Math.floor(Math.random() * alphabetChars.length));

    // Generate the rest of the string
    for (let i = 1; i < length; i++) {
      const allChars = alphabetChars + numericChars;
      result += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    console.log(`Generated random alphanumeric: ${result}`);
    return result;
  }
}
