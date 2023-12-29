import { getBlockAttributes } from "./utils";

export const metadata = {
  tag: "navbar-end",
  type: "WIDGET",
  parent: "navbar",
  description: "End slot in a navbar component.",
  attributes: getBlockAttributes([

    {
      name: "slotend",
      description: "Associates the block with an end-slot directive.",
      required: false,
      type: "directive",
      example: `<navbar-start ></navbar-start>`
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      defaultValue: "display-contents",
      type: "string",
      example: '<navbar-start  css-class="my-custom-class" id="dfg43"></navbar-start>',
    },
  ], "navbar-center"),
  allowedChildren: ["*"],
  allowedInParent: ["navbar"],
  declarativeComponentTag: "ng-declarative-block",
};
