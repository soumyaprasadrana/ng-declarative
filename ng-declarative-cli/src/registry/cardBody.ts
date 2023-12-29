import {

  getBlockAttributes,

} from "./utils";

export const metadata = {
  tag: "card-body",
  type: "WIDGET",
  parent: "card",
  description: "Footer slot in a card component.",
  attributes: getBlockAttributes([
    {
      name: "cardbody",
      description: "Associates the card component with an cardbody directive.",
      required: false,
      type: "directive",
      example: `<card-body ></card-body>`
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      defaultValue: "display-contents",
      type: "string",
      example: '<card-body  css-class="my-custom-class" id="dfg43"></card-body>',
    },
  ], "card-body"),
  allowedChildren: ["*"],
  allowedInParent: ["card"],
  declarativeComponentTag: "ng-declarative-block",
};
