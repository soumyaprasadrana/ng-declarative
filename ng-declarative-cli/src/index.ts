#!/usr/bin/env node

import { Command } from "commander";
import { buildApp, createApp, getHelp, serveApp, generateDocAppData, initApp } from "./lib/cli";

const program = new Command();

program
  .command("build")
  .description("Build the ng-declarative app")
  .option("-w, --watch", "Watch for changes")
  .action((options) => {
    buildApp(options.watch);
  });

program
  .command("create")
  .argument("<name>")
  .description("Create a new ng-declarative app")
  .action((name) => {
    createApp(name);
  });

program
  .command("help")
  .argument("[component]", "Optional: Component name")
  .argument("[attribute]", "Optional: Attribute name")
  .description("Get help for declarative components")
  .action((component = null, attribute = null) => {
    getHelp(component, attribute);
  });
program
  .command("init")
  .description("Initialize the ng-declarative app")
  .action(initApp);
program
  .command("start")
  .description("Start the ng-declarative app")
  .action(serveApp);
program
  .command("generatedocappdata")
  .description("Crates the documentation app using ng-declarative framework")
  .action(() => {
    generateDocAppData();
  });
program
  .version('1.0.0.pre.8')
  .description('CLI for ng-declarative framework')
  .option('-v, --version', 'output the version number')
  .parse(process.argv);

program.parse(process.argv);
