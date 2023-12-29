import { getBlockAttributes } from "./utils";

export const metadata = {
  tag: "sidebar-end",
  type: "WIDGET",
  parent: "sidebar",
  description: "End slot in a sidebar component.",
  attributes: getBlockAttributes([

    {
      name: "slotend",
      description: "Associates the block with an end-slot directive.",
      required: false,
      type: "directive",
      example: `<sidebar-start ></sidebar-start>`
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      defaultValue: "display-contents",
      type: "string",
      example: '<sidebar-start  css-class="my-custom-class" id="dfg43"></sidebar-start>',
    },
  ], "sidebar-center"),
  allowedChildren: ["*"],
  allowedInParent: ["sidebar"],
  declarativeComponentTag: "ng-declarative-block",
};
