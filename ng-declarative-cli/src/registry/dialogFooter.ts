import {
  getBlockAttributes,
} from "./utils";

export const metadata = {
  tag: "dialog-footer",
  type: "WIDGET",
  parent: "dialog",
  description: "Footer slot in a dialog component.",
  attributes: getBlockAttributes([
    {
      name: "dialogFooter",
      description: "Associates the dialog component with an dialogFooter directive.",
      required: false,
      type: "directive",
      example: `<dialog-footer ></dialog-footer>`
    },
    {
      name: "#dialogFooter",
      description: "Associates the dialog-footer with an #dialogFooter directive.",
      required: false,
      type: "directive",
      example: `<dialog-footer ></dialog-footer>`
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      defaultValue: "display-contents",
      type: "string",
      example: '<dialog-footer  css-class="my-custom-class" id="dfg43"></dialog-footer>',
    },
  ], "dialog-footer"),
  allowedChildren: ["*"],
  allowedInParent: ["dialog"],
  declarativeComponentTag: "ng-declarative-block",
};
