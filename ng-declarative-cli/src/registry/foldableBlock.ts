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
  type: "WIDGET",
  description: "A collapsible block component.",
  attributes: getBaseAttributes([
    {
      name: "width",
      description: "Sets the width of the foldable block.",
      required: false,
      mappedInputAttribute: "width",
      type: "string",
      allowedValues: "auto | slim | narrow | compact | mid | medium | wide | spacious | broad | extensive | full",
      defaultValue: "full",
      transform: transformWidth,
      example: `<foldable-block width="medium" id="exampleFoldableBlock"></foldable-block>`
    },

    {
      name: "direction",
      description: "Sets the layout direction of the foldable block's children.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<foldable-block direction="column" id="exampleFoldableBlock"></foldable-block>`
    },

    {
      name: "manage-children",
      description: "Determines whether the foldable block should manage its children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<foldable-block manage-children="true" id="exampleFoldableBlock"></foldable-block>`
    },

    {
      name: "children-sizes",
      description: "Sets the sizes of the foldable block's children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<foldable-block children-sizes="50% 50%" id="exampleFoldableBlock"></foldable-block>`
    },

    {
      name: "children-flex-sizes",
      description: "Sets the flex values of the foldable block's children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<foldable-block children-flex-sizes="1 2" id="exampleFoldableBlock"></foldable-block>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the foldable block.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<foldable-block align-items="center" id="exampleFoldableBlock"></foldable-block>`
    },

    {
      name: "justify-contents",
      description: "Justifies the content of the foldable block.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<foldable-block justify-contents="space-between" id="exampleFoldableBlock"></foldable-block>`
    },

    {
      name: "ngbAccordionItem",
      description: "Associates the foldable block with an NgbAccordionItem directive.",
      required: false,
      type: "directive",
      linkattributevalue: "id",
      example: `<foldable-block ngbAccordionItem="exampleAccordionItem" id="exampleFoldableBlock"></foldable-block>`
    },

    {
      name: "skip-flex",
      description: "Determines whether flex classes should be skipped for the foldable block.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      defaultValue: "true",
      example: `<foldable-block skip-flex="false" id="exampleFoldableBlock"></foldable-block>`
    },

  ], "foldable-block"),
  allowedChildren: ["foldable-block-content", "foldable-block-header"],
  declarativeComponentTag: "ng-declarative-block",
};
