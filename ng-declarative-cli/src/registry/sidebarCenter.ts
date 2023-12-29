import { getBlockAttributes } from "./utils";

export const metadata = {
  tag: "sidebar-center",
  type: "WIDGET",
  parent: "sidebar",
  description: "Center slot in a sidebar component.",
  attributes: getBlockAttributes([

    {
      name: "slotcenter",
      description: "Associates the block with an center-slot directive.",
      required: false,
      type: "directive",
      example: `<sidebar-start ></sidebar-start>`
    },

  ], "sidebar-center"),
  allowedChildren: ["*"],
  allowedInParent: ["sidebar"],
  declarativeComponentTag: "ng-declarative-block",
};
