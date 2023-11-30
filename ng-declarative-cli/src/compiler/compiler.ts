import * as fs from "fs";
import * as path from "path";
import { parseString } from "xml2js";
import { Logger } from "../logger/logger";
import { camelCase, constant } from "lodash";

interface ComponentMetadata {
  declarativeComponentTag: string;
  attributes: Record<string, string>;
  allowedChildren: string;
  tag: string;
}

export class Compiler {
  private registryPath = path.join(__dirname, "..", "registry");
  private outputFolder = path.join(process.cwd(), "compiled-app");
  private transformersPath: string = path.join(__dirname, "..", "transformers");
  private routes: any = [];
  private appSignals: any = [];
  private routeSignals: any = {};
  private appName: string = "Declarative App";
  private appTitle: string = "Ng Declarative App Title";
  private appController: any = null;
  private appControllerFileName: any = null;
  private currentRoute: string = "";
  private loops: any = [];
  private resourcesTobeProcessed: any = [];
  private appDatasets: any = [];
  public isinsideForm: boolean = false;

  private ngDeclarativeComponents = [
    "Application",
    "Label",
    "Block",
    "RouteComponent",
    "Link",
  ];
  private ngDeclarativeModule = "NgDeclarativeModule";
  private ngDeclarativeServices = ["ApplicationService"];

  public addResourceTobeProcessed(resource: any) {
    this.resourcesTobeProcessed.push(resource);
  }
  public setCurrentRoute(routeid: any) {
    this.currentRoute = routeid;
  }

  public getCurrentRoute() {
    return this.currentRoute;
  }

  private readComponentMetadata(componentName: string): any | null {
    const filePath = path.join(this.registryPath, `${componentName}.js`);

    if (fs.existsSync(filePath)) {
      // Read the component metadata file
      const metadata = require(filePath);
      return metadata as ComponentMetadata;
    }

    Logger.error(`Component ${componentName} not found in the registry.`);
    return null;
  }

  private readComponentTransformer(componentName: string): any | null {
    const filePath = path.join(this.transformersPath, `${componentName}.js`);

    if (fs.existsSync(filePath)) {
      // Read the component metadata file
      const transform = require(filePath);
      return transform;
    }

    Logger.error(`Component ${componentName} not found in the registry.`);
    return null;
  }

  async compile(sourceXml: string) {
    Logger.debug(this.registryPath, this.outputFolder);
    // Parse sourceXml and convert declarative tags to Angular code
    parseString(sourceXml, async (err: any, result) => {
      if (err) {
        Logger.error("Error parsing source XML:", err.message);
        return;
      }

      // Traverse each node and process it
      await this.processNode(result, { name: "root" });

      Logger.debug("result", result[Object.keys(result)[0]].$.name);

      // Build the Angular application
      this.createAngularAppStructure(result[Object.keys(result)[0]].$.name);
    });
  }

  public addRoute(route: any) {
    this.routes.push(route);
  }

  public addLoop(loop: any) {
    this.loops.push(loop);
  }

  private async processNode(node: any, parentNode: any) {
    const METHOD = "processNode";
    Logger.debug(METHOD + " :: entry");
    Logger.debug(METHOD + " :: node ::", node);

    const nodeName = Object.keys(node)[0];

    if (nodeName == "form") {
      console.log("============== DEBUG FORM START ========");
      this.isinsideForm = true;
    }

    if ((Object.keys(node)[0] == "input" || Object.keys(node)[0] == "form-action") && !this.isinsideForm) {
      if (Object.keys(node)[0] == "input")
        throw new Error("An input field can only be defined inside a form.");
      if (Object.keys(node)[0] == "form-action")
        throw new Error("An form action button can only be defined inside a form.");
    }

    const nodeNameCamelCase = this.toCamelCase(Object.keys(node)[0]);
    const metadata = this.readComponentMetadata(nodeNameCamelCase).metadata;
    const transform = this.readComponentTransformer(nodeNameCamelCase)
      .transform;
    if (!metadata) {
      Logger.error(`Skipping unknown component: ${nodeName}`);
      return "";
    }

    Logger.debug("Typeof Transform", typeof transform);

    Logger.debug("checking if the node is present under a valid parent node ...")
    const resultofValidateParent = this.validateParent(node, parentNode, metadata);
    if (!resultofValidateParent.result)
      throw new Error(
        `Invalid parent component of ${nodeName}. This component can only declared under ${metadata.allowedInParent.join(",")} 
         `
      );


    const resultOfValidateChildrens = this.validateChildrens(node, metadata);
    Logger.log("Validated Childrens result", resultOfValidateChildrens);

    if (nodeName == "route") {
      this.setCurrentRoute(this.getAttributeFromNode(node, "id"));
    }

    //Check if the root node store the metadata to compiler
    if (metadata.tag == "ng-declarative-app") {
      this.appName = this.getAttributeFromNode(node, "name");
      this.appTitle = this.getAttributeFromNode(node, "title");
      if (this.getAttributeFromNode(node, "controller") != null) {
        try {
          let filePath = path.join(
            "src",
            this.getAttributeFromNode(node, "controller") + ".ts"
          );
          if (fs.existsSync(filePath)) {
            this.appController = path.join(
              "src",
              this.getAttributeFromNode(node, "controller") + ".ts"
            );
            this.appControllerFileName =
              this.getAttributeFromNode(node, "controller") + ".ts";
          } else {
            throw new Error(`File does not exist: ${filePath}`);
          }
        } catch (er) {
          throw er;
        }
      }
    }

    if (!resultOfValidateChildrens.result)
      throw new Error(
        `Invalid child component in ${nodeName},${resultOfValidateChildrens.key ==
          "nochildren"
          ? ""
          : `invalid component ${resultOfValidateChildrens.key}`} .
          ${resultOfValidateChildrens.key == "nochildren"
          ? "This component does not support any child component."
          : ` Please refer to below allowed children components for this node \n ${metadata.allowedChildren.join(
            ","
          )}`} 
         `
      );

    if (metadata.customprocess) {
      if (metadata.processor) {
        return await metadata.processor(
          node,
          parentNode,
          metadata,
          transform,
          this
        );
      } else {
        throw new Error("Internal Error");
      }
    }
    const templateS = await transform(metadata, node, this);
    /*  Logger.debug("Metadata", metadata);
    const attributes = this.processAttributes(metadata.attributes, node);
    Logger.debug("Attributes", attributes);

    const children = await this.processChildren(node[nodeName]);
    console.log("Children ", children);
    const templateS = `<${metadata.declarativeComponentTag} ${attributes}>${children}</${metadata.declarativeComponentTag}>`;

    Logger.debug(METHOD + ":: exit ::" + templateS); */

    //Handle Route
    if (nodeName == "route") {
      this.processRoute(templateS, node);
    }
    if (nodeName == "signal") {
      this.processSignal(node, parentNode);
    }

    if (nodeName == "dataset" && Object.keys(parentNode)[0] == "ng-declarative-app") {
      this.appDatasets.push({
        name: this.getAttributeFromNode(node, "name"),
        template: templateS,
        id: this.getAttributeFromNode(node, "id")
      })
    }

    if (this.isinsideForm && nodeName == "form") {
      this.isinsideForm = false;
    }
    return templateS;
  }
  private processSignal(node: any, parentNode: any) {
    const name = this.getAttributeFromNode(node, "name");
    const type = this.getAttributeFromNode(node, "type");
    const value = this.getAttributeFromNode(node, "value");
    let signal: any = { name: name, type: type };
    if (value) signal.value = value;
    const parentName = Object.keys(parentNode)[0];
    if (parentName == "ng-declarative-app") {
      this.appSignals.push(signal);
    } else if (parentName == "route") {
      const id = this.getAttributeFromNode(parentNode, "id");
      if (this.routeSignals.hasOwnProperty(id)) {
        this.routeSignals[id].push(signal);
      } else {
        this.routeSignals[id] = [];
        this.routeSignals[id].push(signal);
      }
    }
  }

  private validateParent(node: any, parentNode: any, metadata: any) {
    const nodeName = Object.keys(node)[0];
    const parentnodeName = Object.keys(parentNode)[0];
    if (metadata.allowedInParent && Array.isArray(metadata.allowedInParent)) {
      let validParent = false;
      for (var item of metadata.allowedInParent) {
        if (parentnodeName == item) {
          validParent = true;
        }
      }
      if (!validParent)
        return { result: validParent, key: "novalidparent", component: parentnodeName };
      else
        return { result: validParent, key: "validparent" };
    } else {
      return { result: true, key: "*" };
    }

  }

  private validateChildrens(
    node: any,
    metadata: any
  ): { result: boolean; key: string } {
    const nodeName = Object.keys(node)[0];
    Logger.log("Validating for node " + nodeName);
    if (metadata.allowedChildren && metadata.allowedChildren[0] == "*")
      return { result: true, key: "*" };

    //Check if all the children's included under this component are valid and allowed components
    const keys = Object.keys(node[nodeName]);
    for (var key of keys) {
      if (Array.isArray(node[nodeName][key])) {
        if (metadata.allowedChildren == null)
          return { result: false, key: "nochildren" };
        if (!metadata.allowedChildren.includes(key))
          return { result: false, key: key };
      }
    }
    return { result: true, key: "allIncluded" };
  }

  private processRoute(template: string, node: any) {
    const uri = this.getAttributeFromNode(node, "uri");
    const id = this.getAttributeFromNode(node, "id");
    const updatedTemplateString = template
      .replace(/(>,+<)/g, "><")
      .replace(/,</g, "<");

    if (uri == null) {
      throw new Error("Error while processing route; invalid URI ");
    }
    let routeController;
    let routeControllerFileName;
    if (this.getAttributeFromNode(node, "controller") != null) {

      try {
        let filePath = path.join(
          "src",
          this.getAttributeFromNode(node, "controller") + ".ts"
        );
        if (fs.existsSync(filePath)) {
          routeController = path.join(
            "src",
            this.getAttributeFromNode(node, "controller") + ".ts"
          );
          routeControllerFileName =
            this.getAttributeFromNode(node, "controller") + ".ts";
        } else {
          throw new Error(`File does not exist: ${filePath}`);
        }
      } catch (er) {
        throw er;
      }
    }
    this.addRoute({
      route: uri.startsWith("/") ? uri.substring(1) : uri,
      component: "Route" + id,
      template: updatedTemplateString,
      id: id,
      controller: routeController ? routeController : null,
      controllerFileName: routeControllerFileName ? routeControllerFileName : null
    });
    // console.log("====>>>DEBUG>>>>>", JSON.stringify(this.routes));
  }
  private generateRandomString(): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  private getAttributeFromNode(node: any, attributeName: string) {
    const tagName = Object.keys(node)[0];
    Logger.debug(tagName);
    Logger.debug(node);
    Logger.debug(node[tagName].$);
    return node[tagName].$[attributeName]
      ? node[tagName].$[attributeName]
      : null;
  }
  private toCamelCase(str: string): string {
    return camelCase(str);
  }

  private processAttributes(attributes: any, node: any): string {
    const tagName = Object.keys(node)[0];
    // Logger.debug("Attributes", attributes);
    Logger.debug(tagName);
    Logger.debug(node);
    Logger.debug(node[tagName].$);
    return Object.entries(node[tagName].$)
      .filter(([key]) =>
        attributes.some((attr: { name: string }) => attr.name === key)
      ) // Only include attributes present in the metadata
      .map(([key, value]) => {
        const attribute = attributes.find(
          (attr: { name: string }) => attr.name === key
        );
        return `${attribute
          ? attribute.mappedInputAttribute
          : key}="${attribute.transform ? attribute.transform(value) : value}"`;
      })
      .join(" ");
  }

  private async processChildren(children: any): Promise<any[]> {
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
            return Promise.all(
              children[childName].map(async (child: any) => {
                //  console.log(`Child ${childName}:`, child);
                // Wait for the asynchronous operation to complete and return the result
                //return this.processNode({ [childName]: child });
              })
            );
          } else {
            // If there is only one child, process it directly
            const child = { [childName]: children[childName][0] };
            //console.log(`Child ${childName}:`, child);
            // Wait for the asynchronous operation to complete and return the result
            // return this.processNode(child);
          }
        }
      })
    );

    // Flatten the array of results
    return results.flat();
  }

  private createResoucesComponents(workspacePath: any) {
    for (var resource of this.resourcesTobeProcessed) {
      const src = resource.src;
      const file = resource.filename;
      fs.writeFileSync(path.join(workspacePath, file), src);
    }
  }

  private createLoopComponents() {
    for (var loop of this.loops) {
      const fileContent = `
      import { Component } from '@angular/core';
      import {
        ${this.ngDeclarativeServices.join(",")}
      } from "ng-declarative-components";
      import { ApplicationServiceProvider } from "./app.provider.service";
    @Component({
        selector: 'app-loop-${loop.id}',
        template: \`
         @defer(on immediate) {
            @for(item of ${loop.iteratable};track item){
              ${loop.template}
            }
        }
        \`,
        styles: [\`
          :host{
            display:contents;
          }
        \`]
    })
    export class ${loop.component} {
        public appCtrl: any;
        public app: any;
        public routeCtrl: any;
        constructor(public appPropvider: ApplicationServiceProvider) {
             this.app = appPropvider.getApp();
             this.appCtrl = this.app.getAppController();
             this.routeCtrl = this.app.getCurrentRoute().getController();
          }
    }
      `;
      fs.writeFileSync(loop.file_path, fileContent);
    }
  }

  private createRouteComponents(workspacePath: any) {
    for (var route of this.routes) {
      const fileContent = `
      import { Component, OnInit } from '@angular/core';

import { ApplicationServiceProvider } from "./app.provider.service";

${route.controller ? `import { ${route.controllerFileName.replace(".ts", "")} } from "./${route.controllerFileName.replace(".ts", "")}"` : ''}

@Component({
  selector: 'app-route-${route.component}',
  template: \`${route.template}\`,
  styles:[\`
    :host{
      display: contents !important;
    }
  \`]
})
export class ${route.component} implements OnInit {
 public appCtrl: any;
  public app: any;
  ${route.controller ? 'public routeCtrl: any;' : ''}
  constructor(
    public appPropvider: ApplicationServiceProvider
    ) {
    this.app = appPropvider.getApp();
    this.appCtrl = this.app.getAppController();
    ${route.controller ? `this.routeCtrl = new ${route.controllerFileName.replace(".ts", "")}(this.app);` : ''}
    this.app.setCurrentRoute(this);
    
  }
   ngOnInit() {
    this.app.setCurrentRoute(this);
  }
  getController() : any {
  ${route.controller ? `
    return this.routeCtrl;
  
  `: 'return null;'}
  }
  
}

      `;
      const outletFileContent = `
      import { Component } from "@angular/core";
import { ApplicationServiceProvider } from "./app.provider.service";

@Component({
  selector: "app-route-${route.component}-outlet",
  template: \`<router-outlet ></router-outlet>\`,
})
export class ${route.component}Outlet {
  public appCtrl: any;
  public app: any;
  constructor(public appPropvider: ApplicationServiceProvider) {
    this.app = appPropvider.getApp();
    this.appCtrl = this.app.getAppController();
  }
}      
      `;
      const routeModuleContent = `
      import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {
  ${this.ngDeclarativeModule}
} from "ng-declarative-components";
import { ${route.component} } from "./${route.component}.component";
import { RouterModule } from "@angular/router";
import { ${route.component}Outlet } from "./${route.component}-outlet.component";
import { ${route.component}RoutingModule } from "./${route.component}-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

${this.buildLoopsImportStatement(route)}

${this.buildResourceImportStatement(route)}

@NgModule({
  declarations: [ ${route.component}Outlet, ${route.component},  ${this.buildLoopsDeclarationString(
        route
      )} ${this.buildResourceDeclarationString(route)} ],
  imports: [
    CommonModule,
    ${this.ngDeclarativeModule},
    NgbModule,
    RouterModule,
    ${route.component}RoutingModule,
   
  ],
  bootstrap: [ ${route.component}Outlet ],
  providers: [],
})
export class ${route.component}Module {}

      `;

      const routingModuleContent = `
      import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ${route.component} } from "./${route.component}.component";

const routes: Routes = [
  {
    path: "",
    component: ${route.component},
    data: { title: "${route.title}" },
  },
];
@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class ${route.component}RoutingModule {}

      `;
      fs.writeFileSync(route.file_path, fileContent);
      fs.writeFileSync(route.router_route_module_file_path, routeModuleContent);
      fs.writeFileSync(route.router_outlet_file_path, outletFileContent);
      fs.writeFileSync(
        route.router_routing_module_file_path,
        routingModuleContent
      );
      if (route.controller) {
        this.copyFile(route.controller, workspacePath, route.controllerFileName);
      }
    }
  }
  private buildRoutesImportStatement(): string {
    let content = ``;
    for (var route of this.routes) {
      content += `import { ${route.component} } from "./${route.component}.component";`;
    }
    return content;
  }

  private buildResourceImportStatement(route: any) {
    let content = ``;
    for (var resource of this.resourcesTobeProcessed) {
      if (route.id == resource.route)
        content += `import { ${resource.name} } from "./${resource.name}.component";`;
    }
    return content;
  }

  private buildLoopsImportStatement(route: any): string {
    let content = ``;
    for (var loop of this.loops) {
      if (route.id == loop.route)
        content += `import { ${loop.component} } from "./${loop.component}.component";`;
    }
    return content;
  }

  private buildResourceDeclarationString(route: any) {
    let res = "";
    for (var resource of this.resourcesTobeProcessed) {

      if (route.id == resource.route) res += `${resource.name},`;
    }

    return res;
  }

  private buildLoopsDeclarationString(route: any) {
    let res = "";
    for (var loop of this.loops) {

      if (route.id == loop.route) res += `${loop.component},`;
    }
    // console.log("========>>>>>> buildLoopsDeclarationString >>>>>>>>>>", res);
    return res;
  }

  private buildRoutesDeclarationString() {
    let res = "";
    for (var route of this.routes) {
      res += `${route.component},`;
    }
    return res;
  }
  private buildRoutesList(): string {
    let content = `const mainRoutes: Routes = [
      {
    path: "",
    redirectTo: "${this.routes[0].route}",
    pathMatch: "full"
    },`;
    for (var route of this.routes) {
      content += `{
        path:"${route.route}",
         loadChildren: () =>
      import(\`./${route.router_route_module_file_name.replace(
        ".ts",
        ""
      )}\`).then((m) => m.${route.component}Module),
      },`;
    }
    content += `
    ];
    
    `;
    return content;
  }

  private stringifyList(list: any[]): string {
    return `[${list.map((item) => JSON.stringify(item)).join(", ")}]`;
  }

  private processAppDataSets() {
    let content = "";
    for (var dataset of this.appDatasets) {
      content = content + `
      ${dataset.template}
      `
    }
    return content;
  }

  private processAppDatasetsViewChildStatements() {
    let content = "";
    for (var dataset of this.appDatasets) {
      content = content + `
      @ViewChild("${dataset.id}") ${dataset.name} : ElementRef | undefined;
      `
    }
    return content;
  }

  private createAngularAppStructure(workspace: string) {
    const workspaceWithDist = path.join("dist", workspace);
    const workspacePath = path.join(workspaceWithDist, "src");
    const indexPath = path.join(workspacePath, "index.html");
    const mainPath = path.join(workspacePath, "main.ts");
    const stylePath = path.join(workspacePath, "styles.scss");
    const polyfillsPath = path.join(workspacePath, "polyfills.ts");
    const gitignorePath = path.join(workspaceWithDist, ".gitignore");
    const packagejsonPath = path.join(workspaceWithDist, "package.json");
    const angularjsonPath = path.join(workspaceWithDist, "angular.json");
    const tsconfigjsonPath = path.join(workspaceWithDist, "tsconfig.json");
    const tsconfigappjsonPath = path.join(
      workspaceWithDist,
      "tsconfig.app.json"
    );
    const appServiceProviderPath = path.join(
      workspacePath,
      "app.provider.service.ts"
    );
    for (var signal of this.appSignals) {
      Logger.debug("SIGNAL", signal);
    }

    for (var index in this.routes) {
      this.routes[index].file_path = path.join(
        workspacePath,
        this.routes[index].component + ".component.ts"
      );

      this.routes[index].router_outlet_file_path = path.join(
        workspacePath,
        this.routes[index].component + "-outlet" + ".component.ts"
      );

      this.routes[index].router_outlet_file_name =
        this.routes[index].component + "-outlet" + ".component.ts";

      this.routes[index].router_routing_module_file_path = path.join(
        workspacePath,
        this.routes[index].component + "-routing" + ".module.ts"
      );
      this.routes[index].router_routing_module_file_name =
        this.routes[index].component + "-routing" + ".module.ts";

      this.routes[index].router_route_module_file_path = path.join(
        workspacePath,
        this.routes[index].component + ".module.ts"
      );

      this.routes[index].router_route_module_file_name =
        this.routes[index].component + ".module.ts";
    }

    for (var index in this.loops) {
      this.loops[index].file_path = path.join(
        workspacePath,
        this.loops[index].component + ".component.ts"
      );
    }

    // Create directories if they don't exist
    if (!fs.existsSync(workspacePath)) {
      fs.mkdirSync(workspacePath, { recursive: true });
    }

    //Create Resource Components
    this.createResoucesComponents(workspacePath);

    //create dynamic routes comonents
    this.createRouteComponents(workspacePath);

    //Create Loops Component
    this.createLoopComponents();

    //Check for app controller if exits copy to the angular app dir
    if (this.appController != null) {
      this.copyFile(
        this.appController,
        workspacePath,
        this.appControllerFileName
      );
    }

    // Create index.html
    const indexContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>NG Declarative app</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`;
    fs.writeFileSync(indexPath, indexContent);

    const routeImportStatements = this.buildRoutesImportStatement();
    const routesDeclaration = this.buildRoutesList();

    // const loopImportStatements = this.buildLoopsImportStatement();

    // Create main.ts
    const mainContent = `import { Component,ElementRef,NgModule,ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {
  ${this.ngDeclarativeModule}
} from "ng-declarative-components";

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CommonModule } from '@angular/common';

import {
  ${this.ngDeclarativeServices.join(",")}
} from "ng-declarative-components";

import { ApplicationServiceProvider } from "./app.provider.service";



${this.appController
        ? `import { ${this.appControllerFileName.replace(
          ".ts",
          ""
        )} } from "./${this.appControllerFileName.replace(".ts", "")}";`
        : ""}


${routesDeclaration}


@Component({
  selector: 'app-root',
  template: \`
  <ng-declarative-app name="${this.appName}" title="${this
        .appTitle}" [inputSignals]="inputSignals">
        ${this.processAppDataSets()}
    <router-outlet></router-outlet>
  </ng-declarative-app>
  \`,
  styles:[\`
  :host{
    height: 100% !important;
  display: block !important;
  margin: 0 !important;
  }
  \`] ,

})
export class App {
  inputSignals : any = ${this.stringifyList(this.appSignals)};
  ${this.processAppDatasetsViewChildStatements()}

  appCtrl:any;

  constructor(
      private app: ApplicationService,
      private appProvider: ApplicationServiceProvider
    ){
    ${this.appController
        ? `
        this.appCtrl = new ${this.appControllerFileName.replace(
          ".ts",
          ""
        )}(this.app);
        this.app.setAppController(this.appCtrl);`
        : ""}
      this.appProvider.setApp(this.app);
  }
}

@NgModule({
  declarations: [
   App
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    NgDeclarativeModule.forRoot(),
     RouterModule.forRoot(mainRoutes, { enableTracing: false })
  ],
  exports: [],
  providers: [
   
  ],
  bootstrap: [ App ],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  `;
    fs.writeFileSync(mainPath, mainContent);

    // Create style.scss
    const styleContent = "";
    fs.writeFileSync(stylePath, styleContent);

    // Create .gitignore
    const gitignoreContent = `# See http://help.github.com/ignore-files/ for more about ignoring files.

# compiled output
/dist
/tmp
/out-tsc
# Only exists if Bazel was run
/bazel-out

# dependencies
/node_modules

# profiling files
chrome-profiler-events*.json

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# misc
/.angular/cache
/.sass-cache
/connect.lock
/coverage
/libpeerconnection.log
npm-debug.log
yarn-error.log
testem.log
/typings

# System Files
.DS_Store
Thumbs.db
`;
    fs.writeFileSync(gitignorePath, gitignoreContent);

    const packaJSONContent = `
    {
  "name": "${workspace}",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/compiler": "^17.0.0",
    "@angular/core": "^17.0.0",
    "@angular/forms": "^17.0.0",
    "@angular/platform-browser": "^17.0.0",
    "@angular/platform-browser-dynamic": "^17.0.0",
    "@angular/router": "^17.0.0",
    "@ng-bootstrap/ng-bootstrap": "^16.0.0",
    "@angular/localize": "^17.0.0",
    "@popperjs/core": "^2.11.8",
    "bootstrap": "^5.3.2",
    "moment": "^2.18.1",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^17.0.0",
    "@angular/cli": "^17.0.0",
    "@angular/compiler-cli": "^17.0.0",
    "@types/jasmine": "~3.10.0",
    "@types/node": "^12.11.1",
    "jasmine-core": "~3.10.0",
    "karma": "~6.3.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.0.3",
    "karma-jasmine": "~4.0.0",
    "karma-jasmine-html-reporter": "~1.7.0",
    "typescript": "~5.2.2"
  }
}

  `;

    const angularjsoncontent = `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "${workspace}": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/${workspace}",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": [
              "zone.js",
              "src/polyfills.ts"
            ],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "namedChunks": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "1mb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "${workspace}:build:production"
            },
            "development": {
              "buildTarget": "${workspace}:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "buildTarget": "${workspace}:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing",
              "src/polyfills.ts"
            ],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  }
}

`;
    const polyfillcontents = `import "@angular/localize/init";`;
    const tsconfigapppjsoncontent = `/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
`;
    const tsconfigjsoncontent = `/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2022",
    "module": "es2020",
    "lib": ["es2020", "dom"],
    // Strictness flags. Matching the settings applied in the Angular Components source
    // code, ensuring that examples do not break in StackBlitz with stricter settings.
    "noUnusedParameters": false,
    "noUnusedLocals": false,
    "useDefineForClassFields": false,
    "strictNullChecks": true,
    "noImplicitReturns": true,
    "strictFunctionTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictBindCallApply": true,
    "esModuleInterop": true,
    "paths": {
      "@angular/*": [
        "./node_modules/@angular/*"
      ],
      "ng-declarative-components": [
        "../../../ng-declarative-components/projects/ng-declarative-components/src/public-api"
      ]
    }
  
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    "paths": {
      "@angular/*": [
        "./node_modules/@angular/*"
      ],
      "ng-declarative-components": [
        "../../../ng-declarative-components/projects/ng-declarative-components/src/public-api"
      ]
    }
  }
}

`;

    const appServiceProviderContent = `import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApplicationServiceProvider {
  private app: any;
  constructor() {}
  setApp(app: any) {
    this.app = app;
  }
  getApp() {
    return this.app;
  }
}
`;
    fs.writeFileSync(packagejsonPath, packaJSONContent);
    fs.writeFileSync(angularjsonPath, angularjsoncontent);
    fs.writeFileSync(tsconfigappjsonPath, tsconfigapppjsoncontent);
    fs.writeFileSync(tsconfigjsonPath, tsconfigjsoncontent);
    fs.writeFileSync(appServiceProviderPath, appServiceProviderContent);
    fs.writeFileSync(polyfillsPath, polyfillcontents);
    Logger.log("Angular app structure created successfully.");
  }

  private copyFile(sourcePath: any, destinationDir: any, newName: any) {
    const sourceFile = path.basename(sourcePath);
    const destinationPath = path.join(destinationDir, newName || sourceFile);

    // Copy the file
    fs.copyFileSync(sourcePath, destinationPath);

    console.log(`File copied from ${sourcePath} to ${destinationPath}`);
  }

  private createAngularApp(templateString: string) {
    const appName = "ngDeclarativeApp";

    // Create the Angular app using Angular CLI commands
    this.runAngularCommand(`ng new ${appName} --routing=false --style=css`);
    process.chdir(appName);

    // Create a main component with the compiled template
    fs.writeFileSync(
      path.join(process.cwd(), "src", "app", "app.component.ts"),
      `
        import { Component } from '@angular/core';

        @Component({
          selector: 'app-root',
          template: \`${templateString}\`,
        })
        export class AppComponent {}
      `
    );

    // Build the Angular app
    this.runAngularCommand(
      `ng build --prod --output-path ${this.outputFolder}`
    );
  }

  private runAngularCommand(command: string) {
    const result = require("child_process").execSync(command, {
      encoding: "utf-8",
    });
    Logger.log(result);
  }
}
