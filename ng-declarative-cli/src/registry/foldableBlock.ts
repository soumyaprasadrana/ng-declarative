import {
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "foldable-block",
  attributes: getBaseAttributes([

    {
      name: "width",
      required: false,
      mappedInputAttribute: "width",
      type: "string",
      allowedValues:
        "auto | slim | narrow | compact | mid | medium | wide | spacious | broad | extensive | full",
      defaultValue: "full",
      transform: transformWidth,
    },
    {
      name: "direction",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
    },
    {
      name: "manage-children",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
    },
    {
      name: "children-sizes",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
    },
    {
      name: "children-flex-sizes",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
    },
    {
      name: "align-items",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
    },
    {
      name: "justify-contents",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues:
        "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
    },
    {
      name: "ngbAccordionItem ",
      required: false,
      type: "directive",
      linkattributevalue: "id"
    },
    {
      name: "skip-flex",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      defaultValue: "true",
    },
  ]),
  allowedChildren: ["foldable-block-content", "foldable-block-header"],
  declarativeComponentTag: "ng-declarative-block",
};
