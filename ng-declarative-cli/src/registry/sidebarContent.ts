import { getBlockAttributes } from "./utils";

export const metadata = {
  tag: "sidebar-content",
  type: "WIDGET",
  parent: "sidebar",
  description: "Center slot in a sidebar component.",
  attributes: getBlockAttributes([

    {
      name: "slotcontent",
      description: "Associates the block with an content-slot directive.",
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
      example: '<sidebar-ceneter  css-class="my-custom-class" id="dfg43"></sidebar-start>',
    },
  ], "sidebar-content"),
  allowedChildren: ["*"],
  allowedInParent: ["sidebar"],
  declarativeComponentTag: "ng-declarative-block",
};
