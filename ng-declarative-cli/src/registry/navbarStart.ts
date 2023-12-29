import { getBlockAttributes } from "./utils";

export const metadata = {
  tag: "navbar-start",
  type: "WIDGET",
  parent: "navbar",
  description: "Start slot in a navbar component.",
  attributes: getBlockAttributes([

    {
      name: "slotstart",
      description: "Associates the block with an start-slot directive.",
      required: false,
      type: "directive",
      example: `<navbar-start ></navbar-start>`
    },
  ], "navbar-start"),
  allowedChildren: ["*"],
  allowedInParent: ["navbar"],
  declarativeComponentTag: "ng-declarative-block",
};
