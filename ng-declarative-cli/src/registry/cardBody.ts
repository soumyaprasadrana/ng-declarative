import {
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "card-body",
  type: "WIDGET",
  parent: "card",
  description: "Footer slot in a card component.",
  attributes: getBaseAttributes([
    {
      name: "direction",
      description: "Specifies the layout direction of the card-body.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<card-body direction="row">...</card-body>`
    },

    {
      name: "manage-children",
      description: "Determines whether the card-body should manage its children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<card-body manage-children="true">...</card-body>`
    },

    {
      name: "children-sizes",
      description: "Specifies the sizes of the card-body's children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<card-body children-sizes="50% 50%">...</card-body>`
    },

    {
      name: "children-flex-sizes",
      description: "Specifies the flex sizes of the card-body's children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<card-body children-flex-sizes="1 2">...</card-body>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the card-body along the cross-axis.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<card-body align-items="center">...</card-body>`
    },

    {
      name: "justify-contents",
      description: "Aligns the content of the card-body along the main-axis.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<card-body justify-contents="space-between">...</card-body>`
    },

    {
      name: "skip-flex",
      description: "Determines whether to skip applying flex classes to the card-body.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<card-body skip-flex="true">...</card-body>`
    },
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
