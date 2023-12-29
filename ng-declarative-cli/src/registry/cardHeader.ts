import { getBlockAttributes } from "./utils";

export const metadata = {
  tag: "card-header",
  type: "WIDGET",
  parent: "card",
  description: "Header slot in a card component.",
  attributes: getBlockAttributes([
    {
      name: "cardheader",
      description: "Associates the card-header with an cardheader directive.",
      required: false,
      type: "directive",
      example: `<card-header ></card-header>`
    },
    {
      name: "#cardHeader",
      description: "Associates the card-header with an cardheader directive.",
      required: false,
      type: "directive",
      example: `<card-header ></card-header>`
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      defaultValue: "display-contents",
      type: "string",
      example: '<card-header  css-class="my-custom-class" id="dfg43"></card-header>',
    },
  ], "card-header"),
  allowedChildren: ["*"],
  allowedInParent: ["card"],
  declarativeComponentTag: "ng-declarative-block",
};
