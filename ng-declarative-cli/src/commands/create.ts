import { Command } from "commander";
import { createApp } from "../lib/cli";

const program = new Command("create");

program
  .command("create")
  .argument("<name>")
  .description("Create a new ng-declarative app")
  .action((name) => {
    createApp(name);
  });

export = program;
