#!/usr/bin/env node

import { Command } from "commander";
import { buildApp, createApp, serveApp } from "./lib/cli";
import createCommand from "./commands/create";
import serveCommand from "./commands/serve";

const program = new Command();

program
  .command("build")
  .description("Build the ng-declarative app")
  .action(() => {
    buildApp();
  });

program
  .command("create")
  .argument("<name>")
  .description("Create a new ng-declarative app")
  .action((name) => {
    createApp(name);
  });

program
  .command("serve")
  .description("Serve the ng-declarative app")
  .action(() => {
    serveApp();
  });

program.parse(process.argv);
