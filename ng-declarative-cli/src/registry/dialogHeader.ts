import { getBlockAttributes } from "./utils";

export const metadata = {
  tag: "dialog-header",
  type: "WIDGET",
  parent: "dialog",
  description: "Header slot in a dialog component.",
  attributes: getBlockAttributes([
    {
      name: "dialogHeader",
      description: "Associates the dialog-header with an dialogheader directive.",
      required: false,
      type: "directive",
      example: `<dialog-header ></dialog-header>`
    },
    {
      name: "#dialogHeader",
      description: "Associates the dialog-header with an #dialogHeader directive.",
      required: false,
      type: "directive",
      example: `<dialog-header ></dialog-header>`
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      defaultValue: "display-contents",
      type: "string",
      example: '<dialog-header  css-class="my-custom-class" id="dfg43"></dialog-header>',
    },
  ], "dialog-header"),
  allowedChildren: ["*"],
  allowedInParent: ["dialog"],
  declarativeComponentTag: "ng-declarative-block",
};
