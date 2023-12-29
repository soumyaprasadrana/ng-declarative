import {
  getBlockAttributes,
} from "./utils";

export const metadata = {
  tag: "sidebar-start",
  type: "WIDGET",
  parent: "sidebar",
  description: "Start slot in a sidebar component.",
  attributes: getBlockAttributes([
    {
      name: "slotstart",
      description: "Associates the block with an start-slot directive.",
      required: false,
      type: "directive",
      example: `<sidebar-start ></sidebar-start>`
    },
  ], "sidebar-start"),
  allowedChildren: ["*"],
  allowedInParent: ["sidebar"],
  declarativeComponentTag: "ng-declarative-block",
};
