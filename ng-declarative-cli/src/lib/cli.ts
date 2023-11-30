import { execSync } from "child_process";
import { Compiler } from "../compiler/compiler";
import * as fs from "fs";
import * as path from "path";
import { IDProcessor } from "../compiler/idprocessor";

export function createApp(name: string): void {
  execSync(`ng new ${name} --style=css --routing=false`);
  console.log(`Created ng-declarative app "${name}"`);
}

export function getHelp(componentClass: any, attributeName: any) {
  if (!componentClass) {
    console.log("Usage: help <component> <attribute>")
  }
  if (!attributeName) {

  } else {
    const component = require("../registry/" + componentClass);
    const attribute = component.metadata.attributes.filter((obj: { name: any; }) => obj.name == attributeName)[0];
    if (!attribute) {
      console.log("Attribute not found under component " + componentClass);
    }
    else {
      const {
        name,
        required,
        type,
        allowedValues
      } = attribute;

      console.log(`Attribute: ${name}`);
      console.log(`Required: ${required}`);
      console.log(`Type: ${type}`);
      console.log(`Allowed Values: ${allowedValues}`);
    }
  }
}

export async function buildApp(watch: any) {
  const sourceXmlPath = path.join(process.cwd(), "src", "source.xml");

  const build = async () => {
    try {
      // Read and parse source.xml
      // Invoke ID Processor
      const idProcessor = new IDProcessor(sourceXmlPath);
      idProcessor.processIDs();
      const sourceXml = await fs.promises.readFile(sourceXmlPath, "utf-8");
      const compiler = new Compiler();
      await compiler.compile(sourceXml);

      console.log("Built ng-declarative app");
    } catch (error) {
      console.error("Error reading or parsing source.xml:", error);
    }
  };

  // Initial build
  await build();

  if (watch) {
    console.log("Watching for changes...");

    // Debounce the file change events
    let timeout: NodeJS.Timeout;
    const debouncedBuild = (fileName: any, event: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        console.log(`File ${fileName} has been ${event}`);
        await build();

      }, 100); // Adjust the debounce time as needed
    };

    // Watch for changes in the src folder
    const watcher = fs.watch('src', { recursive: true }, (event, filename) => {
      //console.log(`File ${filename} has been ${event}`);
      // Trigger the build again on file changes
      debouncedBuild(filename, event);
    });

    // Wait until the user exits (Ctrl+C)
    process.on('SIGINT', () => {
      watcher.close();
      console.log('\nWatching stopped.');
      process.exit();
    });

    // Handle other exit signals gracefully
    process.on('exit', () => {
      watcher.close();
    });
  }
}

export function serveApp(): void {
  execSync("ng serve");
  console.log("Serving ng-declarative app");
}
