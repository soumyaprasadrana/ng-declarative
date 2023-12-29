import {

  getBlockAttributes,

} from "./utils";

export const metadata = {
  tag: "navbar-center",
  type: "WIDGET",
  parent: "navbar",
  description: "Center slot in a navbar component.",
  attributes: getBlockAttributes([
    {
      name: "slotcenter",
      description: "Associates the block with an center-slot directive.",
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
      example: '<navbar-ceneter  css-class="my-custom-class" id="dfg43"></navbar-start>',
    },
  ], "navbar-center"),
  allowedChildren: ["*"],
  allowedInParent: ["navbar"],
  declarativeComponentTag: "ng-declarative-block",
};
