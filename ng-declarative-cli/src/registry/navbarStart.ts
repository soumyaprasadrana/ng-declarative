import {
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "navbar-start",
  type: "WIDGET",
  parent: "navbar",
  description: "Start slot in a navbar component.",
  attributes: getBaseAttributes([
    {
      name: "direction",
      description: "Specifies the layout direction of the block.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<block direction="row">...</block>`
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      defaultValue: "display-contents",
      type: "string",
      example: '<navbar-start  css-class="my-custom-class" id="dfg43"></navbar-start>',
    },

    {
      name: "manage-children",
      description: "Determines whether the block should manage its children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<block manage-children="true">...</block>`
    },

    {
      name: "children-sizes",
      description: "Specifies the sizes of the block's children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<block children-sizes="50% 50%">...</block>`
    },

    {
      name: "children-flex-sizes",
      description: "Specifies the flex sizes of the block's children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<block children-flex-sizes="1 2">...</block>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the block along the cross-axis.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<block align-items="center">...</block>`
    },

    {
      name: "justify-contents",
      description: "Aligns the content of the block along the main-axis.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<block justify-contents="space-between">...</block>`
    },

    {
      name: "skip-flex",
      description: "Determines whether to skip applying flex classes to the block.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      defaultValue: "true",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<block skip-flex="true">...</block>`
    },
    {
      name: "slotstart",
      description: "Associates the block with an start-slot directive.",
      required: false,
      type: "directive",
      example: `<navbar-start ></navbar-start>`
    },
  ], "navbar-start"),
  allowedChildren: ["*"],
  allowedInParent: ["navbar"],
  declarativeComponentTag: "ng-declarative-block",
};
