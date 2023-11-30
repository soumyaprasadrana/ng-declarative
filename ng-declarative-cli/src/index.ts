#!/usr/bin/env node

import { Command } from "commander";
import { buildApp, createApp, getHelp, serveApp } from "./lib/cli";

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
  .command("serve")
  .description("Serve the ng-declarative app")
  .action(() => {
    serveApp();
  });

program.parse(process.argv);
