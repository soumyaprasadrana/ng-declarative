import {
  getBlockAttributes,
} from "./utils";

export const metadata = {
  tag: "card-footer",
  type: "WIDGET",
  parent: "card",
  description: "Footer slot in a card component.",
  attributes: getBlockAttributes([
    {
      name: "cardfooter",
      description: "Associates the card component with an cardfooter directive.",
      required: false,
      type: "directive",
      example: `<card-footer ></card-footer>`
    },
    {
      name: "#cardFooter",
      description: "Associates the card-footer with an cardheader directive.",
      required: false,
      type: "directive",
      example: `<card-footer ></card-footer>`
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      defaultValue: "display-contents",
      type: "string",
      example: '<card-footer  css-class="my-custom-class" id="dfg43"></card-footer>',
    },
  ], "card-footer"),
  allowedChildren: ["*"],
  allowedInParent: ["card"],
  declarativeComponentTag: "ng-declarative-block",
};
