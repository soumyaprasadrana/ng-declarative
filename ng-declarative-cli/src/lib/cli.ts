import { execSync } from "child_process";
import { Compiler } from "../compiler/compiler";
import * as fs from "fs";
import * as path from "path";
import { IDProcessor } from "../compiler/idprocessor";

export function createApp(name: string): void {
  execSync(`ng new ${name} --style=css --routing=false`);
  console.log(`Created ng-declarative app "${name}"`);
}

export async function buildApp() {
  const sourceXmlPath = path.join(process.cwd(), "src", "source.xml");

  try {
    // Read and parse source.xml
    // Invoke ID Processor
    const idProcessor = new IDProcessor(sourceXmlPath);
    idProcessor.processIDs();
    const sourceXml = fs.readFileSync(sourceXmlPath, "utf-8");
    const compiler = new Compiler();
    await compiler.compile(sourceXml);
  } catch (error) {
    console.error("Error reading or parsing source.xml:", error);
  }
  console.log("Built ng-declarative app");
}

export function serveApp(): void {
  execSync("ng serve");
  console.log("Serving ng-declarative app");
}
