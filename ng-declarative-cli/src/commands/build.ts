import { Command } from "commander";
import { buildApp } from "../lib/cli";

const program = new Command("build");

program
  .command("build")
  .description("Build the ng-declarative app")
  .action(() => {
    buildApp();
  });

export = program;
