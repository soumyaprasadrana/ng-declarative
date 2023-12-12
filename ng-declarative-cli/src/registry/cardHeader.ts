import {
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "card-header",
  type: "WIDGET",
  parent: "card",
  description: "Header slot in a card component.",
  attributes: getBaseAttributes([
    {
      name: "direction",
      description: "Specifies the layout direction of the card-header.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<card-header direction="row">...</card-header>`
    },

    {
      name: "manage-children",
      description: "Determines whether the card-header should manage its children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<card-header manage-children="true">...</card-header>`
    },

    {
      name: "children-sizes",
      description: "Specifies the sizes of the card-header's children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<card-header children-sizes="50% 50%">...</card-header>`
    },

    {
      name: "children-flex-sizes",
      description: "Specifies the flex sizes of the card-header's children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<card-header children-flex-sizes="1 2">...</card-header>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the card-header along the cross-axis.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<card-header align-items="center">...</card-header>`
    },

    {
      name: "justify-contents",
      description: "Aligns the content of the card-header along the main-axis.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<card-header justify-contents="space-between">...</card-header>`
    },

    {
      name: "skip-flex",
      description: "Determines whether to skip applying flex classes to the card-header.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<card-header skip-flex="true">...</card-header>`
    },
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
