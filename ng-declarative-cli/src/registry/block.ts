import {
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "block",
  type: "LAYOUT",
  description: "A block is a configurable flex box.",
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
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<block skip-flex="true">...</block>`
    },
    {
      name: "responsive",
      description: "Determines whether a block is responsive to device viewport.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "responsive",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<block responsive="true">...</block>`
    },
    {
      name: "viewport-sm",
      description: "Set the direction of flex box for small breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportSM",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<block viewport-sm="column">...</block>`
    },
    {
      name: "viewport-md",
      description: "Set the direction of flex box for medium breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportMD",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<block viewport-md="column">...</block>`
    },
    {
      name: "viewport-lg",
      description: "Set the direction of flex box for lg breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportLG",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<block viewport-lg="column">...</block>`
    },
    {
      name: "viewport-xl",
      description: "Set the direction of flex box for xl breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportXL",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<block viewport-xl="column">...</block>`
    },
    {
      name: "viewport-xxl",
      description: "Set the direction of flex box for xxl breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportXXL",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<block viewport-xxl="column">...</block>`
    },

  ], "block"),
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-block",
};
