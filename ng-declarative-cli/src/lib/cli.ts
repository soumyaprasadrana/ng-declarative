import { execSync } from "child_process";
import { Compiler } from "../compiler/compiler";
import * as fs from "fs";
import * as path from "path";
import { IDProcessor } from "../compiler/idprocessor";
import { Logger } from "../logger/logger";

export function createApp(name: string): void {

  console.log("Creating an awsome app " + name + " ....");
  const sourceXMLContent = `
<ng-declarative-app controller="AppController" name="${name}" id="FeNV5u8">
  <navbar sticky="true" color-scheme="dark" brand-text-css-class="text-warning" brand-icon="bi bi-airplane-engines text-warning" brand-text="%%appCtrl.appName%%" id="bUYgwdF">
    <navbar-center id="iynGj1C">
      <form css-class="search-form" transition="tada" transition-duration="long" action="appCtrl.doSearch" direction="row" width="full" id="VhZuQA1">
        <input transition="slide-in" transition-duration="long" prepend-icon-class="bi bi-search" required="true" theme="text" attribute-name="search" model="appCtrl.username" placeholder="Search..." id="YAO0fEm"/>
        <form-action css-class="text-muted" transition="slide-in" theme="warning" transition-duration="long" label="Search" id="PML0lSd"/>
      </form>
    </navbar-center>
    <navbar-end id="vdweRWwhi">
      <navitem route="/home" label="Home" id="fiwde6fyb"/>
    </navbar-end>
  </navbar>
  <route uri="/home" title="Declarative Sample App" id="home">
    <block width="full" height="full" justify-contents="center" align-items="center" direction="column" id="wizYbyA">
      <block  direction="row" id="ySy4I1u">
        <block justify-contents="center" align-items="center" direction="column" id="xagOI">
            <image transition="tada" transition-duration="long" css-class="text-warning main-icon" type="icon" icon="bi bi-airplane-engines" id="ijMfMaD"/>
            <label  css-class="badge bg-warning text-dark" theme="display-large,bold" text="hover the icon!" id="DPw4cdN9Y"/>
        </block>
        <block width="min-content" direction="column" id="xalZgOI">
          <label  transition="typing" transition-duration="short" theme="display-large,bold" text="%%appCtrl.pageHeading%%" id="DPw4N9Y"/>
          <label  transition="typing" transition-duration="long" theme="heading-small,bold" text="%%appCtrl.pageSubHeading%%" id="DcdsPw4N9Y"/>
          <paragraph transition="typing" transition-duration="  " text="%%appCtrl.pageParagraph%%" id="k6MoblQ"/>
        </block>
      </block>
    </block>
  </route>
</ng-declarative-app>
  
  `;

  const appCtrlContent = ` 
  export class AppController {

    appName = "${name}";
    pageHeading = "Hello, "
    pageSubHeading = "I am a sample app built using ng-declarative framework!";
    pageParagraph = \`Embrace simplicity with NG Declarative Framework – a powerful tool for Angular app development.Say goodbye to complex setups; design your UI with ease using XML components.Remember, why do programmers prefer dark mode ? Because light attracts bugs! Happy coding!\`
    constructor(private app: any) {

    }
}
`;

  const stylesscssContent = `
  .search-form{
    .form-group{
        margin-right: 0px !important;
    }
    .input-group-text{
        border-color: var(--bs-warning);
        border-radius: 0;
    }
    .form-control{

        border: 1px solid var(--bs-warning);
        border-right: 10px solid var(--bs-warning);
    }

}
.app-nav{
    background-color: #000;
}
.main-icon{
    font-size: 200px;
    transform: rotate(45deg);
    display: inline-block;
}

 .main-icon:hover {
            animation: shakeAndFly 2s ease-in-out forwards;
        }

        @keyframes shakeAndFly {
            0%, 100% {
                transform: translateX(0) rotate(0);
            }
            10%, 30%, 50%, 70% {
                transform: translateX(-5px) rotate(-5deg);
            }
            20%, 40%, 60% {
                transform: translateX(5px) rotate(5deg);
            }
            100% {
                transform: translateY(-100vh);
            }
        }

`;
  const pkgjsoncontent = `
{
  "name": "${name}",
  "version": "1.0.0",
  "scripts": {
    "build": "ng-declarative build",
    "start": "ng-declarative start",
    "build-prod": "ng-declarative build-prod",
    "build-watch": "ng-declarative build --watch"
  },
  "description": "Declarative Sample App",
  "author": "",
  "license": "MIT",
  "dependencies": {
    "ng-declarative-components": "next"
  }
}


`;
  const workspaceHome = path.join(name);
  const workspaceSrcPath = path.join(workspaceHome, "src");
  // Create directories if they don't exist
  if (!fs.existsSync(workspaceHome)) {
    fs.mkdirSync(workspaceHome, { recursive: true });
  }

  if (!fs.existsSync(workspaceSrcPath)) {
    fs.mkdirSync(workspaceSrcPath, { recursive: true });
  }

  const sourceXMLPath = path.join(workspaceSrcPath, "source.xml");
  const AppControllerPath = path.join(workspaceSrcPath, "AppController.ts");
  const StylesPath = path.join(workspaceSrcPath, "Styles.scss");
  const pkgjsonPath = path.join(workspaceHome, "package.json");

  fs.writeFileSync(sourceXMLPath, sourceXMLContent);
  fs.writeFileSync(AppControllerPath, appCtrlContent);
  fs.writeFileSync(StylesPath, stylesscssContent);
  fs.writeFileSync(pkgjsonPath, pkgjsoncontent);

  console.log("Wow! Your app created successfully! ");
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
        description,
        example,
        name,
        required,
        type,
        allowedValues,
        objectbinding
      } = attribute;
      const ANSI_COLOR_RESET = "\x1b[0m";
      const ANSI_COLOR_BLUE_BRIGHT = "\x1b[94m";
      const ANSI_COLOR_GREEN_BRIGHT = "\x1b[92m";
      const ANSI_COLOR_RED_BRIGHT = "\x1b[91m";
      const ANSI_FONT_BOLD = "\x1b[1m";

      // ...

      const requiredColor = required ? ANSI_COLOR_GREEN_BRIGHT : ANSI_COLOR_RED_BRIGHT;

      console.log(`${ANSI_FONT_BOLD}Description:${ANSI_COLOR_RESET} ${ANSI_COLOR_GREEN_BRIGHT}${description}${ANSI_COLOR_RESET}`);
      console.log(`${ANSI_FONT_BOLD}Example:${ANSI_COLOR_RESET} ${ANSI_COLOR_BLUE_BRIGHT}${example}${ANSI_COLOR_RESET}`);
      console.log(`${ANSI_FONT_BOLD}Attribute:${ANSI_COLOR_RESET} ${ANSI_COLOR_BLUE_BRIGHT}${name}${ANSI_COLOR_RESET}`);
      console.log(`${ANSI_FONT_BOLD}Required:${ANSI_COLOR_RESET} ${requiredColor}${required}${ANSI_COLOR_RESET}`);
      console.log(`${ANSI_FONT_BOLD}Type:${ANSI_COLOR_RESET} ${ANSI_COLOR_BLUE_BRIGHT}${type}${ANSI_COLOR_RESET}`);
      if (allowedValues)
        console.log(`${ANSI_FONT_BOLD}Allowed Values:${ANSI_COLOR_RESET} ${ANSI_COLOR_BLUE_BRIGHT}${allowedValues}${ANSI_COLOR_RESET}`);
      if (objectbinding)
        console.log(`${ANSI_FONT_BOLD}Allowed Values:${ANSI_COLOR_RESET} ${ANSI_COLOR_BLUE_BRIGHT}${objectbinding}${ANSI_COLOR_RESET}`);
    }
  }
}

export async function generateDocAppData() {
  // Specify the directory path
  const directoryPath = path.join(__dirname, '..', 'registry');
  const docAppPath = path.join(__dirname, "..", "..", "..", "ng-declarative-doc-app", "src");
  let componentsMetadatas: any = [];
  console.log("DEBUG :: DIR PATH :: ", directoryPath);
  // Read the contents of the directory
  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // Check if it's a JavaScript file
    if (fs.statSync(filePath).isFile() && path.extname(file) === '.js' && !file.startsWith('.') && !file.includes("utils")) {
      // Dynamically import the module
      const module = require(filePath);

      // Now you can use the module as needed
      console.log(`Module ${file} imported:`, module.metadata.tag);
      for (var index in module.metadata.attributes) {
        if (module.metadata.attributes[index].requiredIfAttributeNotPresent) {
          module.metadata.attributes[index].required = "true";
          if (Array.isArray(module.metadata.attributes[index].requiredIfAttributeNotPresent))
            module.metadata.attributes[index].requiredIfAttributeNotPresent = module.metadata.attributes[index].requiredIfAttributeNotPresent.join(",")
        }
      }
      componentsMetadatas.push(module.metadata);
    }
  });

  const componentsGroupBy = exports.groupBy(componentsMetadatas, "type");
  //console.log(componentsGroupBy);
  const metadatajsonfilepath = path.join(docAppPath, "assets", "metadata.json");
  console.log(metadatajsonfilepath);
  fs.writeFileSync(metadatajsonfilepath, JSON.stringify(componentsGroupBy, null, 4));

  console.log("Wow! Your app created successfully! ");
}
export function groupBy(list: any, key: any) {
  return list.reduce((result: any, item: any) => {
    const keyValue = item[key];
    if (!result.hasOwnProperty(keyValue)) {
      result[keyValue] = [];
    }
    result[keyValue].push(item);
    return result;
  }, {});
}


export async function buildApp(watch: any) {
  const sourceXmlPath = path.join(process.cwd(), "src", "source.xml");
  if (!fs.existsSync(sourceXmlPath)) {
    console.log('\x1b[31m\x1b[1m%s\x1b[0m', "unknown workspace");
    return;
  }
  const build = async () => {
    try {
      // Read and parse source.xml
      // Invoke ID Processor
      const idProcessor = new IDProcessor(sourceXmlPath);
      idProcessor.processIDs();
      const sourceXml = await fs.promises.readFile(sourceXmlPath, "utf-8");
      const compiler = new Compiler();
      //console.log("DEBUG Before compiler.compile");
      await compiler.compile(sourceXml);

      Logger.logSuccess("Built ng-declarative app");
    } catch (error: any) {
      console.log('\x1b[31m\x1b[1m%s\x1b[0m', error.message);
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

      }, 200); // Adjust the debounce time as needed
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

export async function serveApp() {
  const sourceXmlPath = path.join(process.cwd(), "src", "source.xml");
  if (!fs.existsSync(sourceXmlPath)) {
    console.log('\x1b[31m\x1b[1m%s\x1b[0m', "unknown workspace");
    return;
  }
  const sourceXML = await fs.promises.readFile(sourceXmlPath, "utf-8"); 4
  const compiler = new Compiler();
  const appName: any = await compiler.getAppName(sourceXML);
  const appPath = path.join(process.cwd(), "dist", appName);

  try {
    execSync(`npm run start`, { cwd: appPath, stdio: 'inherit' });
    console.log("Serving ng-declarative app");
  } catch (error) {
    console.error('Error:', error);
  }

}
export async function initApp() {
  const sourceXmlPath = path.join(process.cwd(), "src", "source.xml");
  if (!fs.existsSync(sourceXmlPath)) {
    console.log('\x1b[31m\x1b[1m%s\x1b[0m', "unknown workspace");
    return;
  }
  const sourceXML = await fs.promises.readFile(sourceXmlPath, "utf-8"); 4
  const compiler = new Compiler();
  const appName: any = await compiler.getAppName(sourceXML);
  const appPath = path.join(process.cwd(), "dist", appName);

  try {
    execSync(`yarn install`, { cwd: appPath, stdio: 'inherit' });
    console.log("Starting depndacy downloading for ng-declarative app");
  } catch (error) {
    console.error('Error:', error);
  }

}
