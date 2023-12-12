import {
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "card-footer",
  type: "WIDGET",
  parent: "card",
  description: "Footer slot in a card component.",
  attributes: getBaseAttributes([
    {
      name: "direction",
      description: "Specifies the layout direction of the card-footer.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<card-footer direction="row">...</card-footer>`
    },

    {
      name: "manage-children",
      description: "Determines whether the card-footer should manage its children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<card-footer manage-children="true">...</card-footer>`
    },

    {
      name: "children-sizes",
      description: "Specifies the sizes of the card-footer's children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<card-footer children-sizes="50% 50%">...</card-footer>`
    },

    {
      name: "children-flex-sizes",
      description: "Specifies the flex sizes of the card-footer's children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<card-footer children-flex-sizes="1 2">...</card-footer>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the card-footer along the cross-axis.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<card-footer align-items="center">...</card-footer>`
    },

    {
      name: "justify-contents",
      description: "Aligns the content of the card-footer along the main-axis.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<card-footer justify-contents="space-between">...</card-footer>`
    },

    {
      name: "skip-flex",
      description: "Determines whether to skip applying flex classes to the card-footer.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<card-footer skip-flex="true">...</card-footer>`
    },
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
