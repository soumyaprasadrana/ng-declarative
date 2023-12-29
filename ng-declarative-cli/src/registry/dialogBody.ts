import {

  getBlockAttributes,

} from "./utils";

export const metadata = {
  tag: "dialog-body",
  type: "WIDGET",
  parent: "dialog",
  description: "Body slot in a dialog component.",
  attributes: getBlockAttributes([
    {
      name: "dialogBody",
      description: "Associates the dialog component with a modalBody directive.",
      required: false,
      type: "directive",
      example: `<dialog-body ></dialog-body>`
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      defaultValue: "display-contents",
      type: "string",
      example: '<dialog-body  css-class="my-custom-class" id="dfg43"></dialog-body>',
    },
  ], "dialog-body"),
  allowedChildren: ["*"],
  allowedInParent: ["dialog"],
  declarativeComponentTag: "ng-declarative-block",
};
