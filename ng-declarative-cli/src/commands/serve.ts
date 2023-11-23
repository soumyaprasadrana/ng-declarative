import { Command } from "commander";
import { serveApp } from "../lib/cli";

const program = new Command("serve");

program
  .command("serve")
  .description("Serve the ng-declarative app")
  .action(() => {
    serveApp();
  });

export = program;
