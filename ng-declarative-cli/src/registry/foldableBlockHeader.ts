import {
  addChildToDOMElement,
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "foldable-block-header",
  type: "WIDGET",
  description: "Header for a foldable block.",
  customprocess: true,
  processor: async (
    node: any,
    parentNode: any,
    metadata: any,
    transform: any,
    compiler: any
  ) => {
    const template = await transform(metadata, node, compiler);
    const id = compiler.getAttributeFromNode(node, "id");
    const header = compiler.getAttributeFromNode(node, "header-value");
    const childAddedDOM = addChildToDOMElement(template, "ng-declarative-block", `<button ngbAccordionButton >${header}</button>`);
    console.log(childAddedDOM);

    return childAddedDOM;

  },
  attributes: getBaseAttributes([
    {
      name: "width",
      description: "Sets the width of the foldable block header.",
      required: false,
      mappedInputAttribute: "width",
      type: "string",
      allowedValues: "auto | slim | narrow | compact | mid | medium | wide | spacious | broad | extensive | full",
      defaultValue: "full",
      transform: transformWidth,
      example: `<foldable-block-header width="medium" id="exampleFoldableBlockHeader"></foldable-block-header>`
    },

    {
      name: "direction",
      description: "Sets the layout direction of the foldable block header's children.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<foldable-block-header direction="column" id="exampleFoldableBlockHeader"></foldable-block-header>`
    },

    {
      name: "manage-children",
      description: "Determines whether the foldable block header should manage its children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<foldable-block-header manage-children="true" id="exampleFoldableBlockHeader"></foldable-block-header>`
    },

    {
      name: "children-sizes",
      description: "Sets the sizes of the foldable block header's children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<foldable-block-header children-sizes="50% 50%" id="exampleFoldableBlockHeader"></foldable-block-header>`
    },

    {
      name: "children-flex-sizes",
      description: "Sets the flex values of the foldable block header's children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<foldable-block-header children-flex-sizes="1 2" id="exampleFoldableBlockHeader"></foldable-block-header>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the foldable block header.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<foldable-block-header align-items="center" id="exampleFoldableBlockHeader"></foldable-block-header>`
    },

    {
      name: "justify-contents",
      description: "Justifies the content of the foldable block header.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<foldable-block-header justify-contents="space-between" id="exampleFoldableBlockHeader"></foldable-block-header>`
    },

    {
      name: "ngbAccordionHeader",
      description: "Associates the foldable block header with an NgbAccordionHeader directive.",
      required: false,
      type: "directive",
      example: `<foldable-block-header ngbAccordionHeader="exampleAccordionHeader" id="exampleFoldableBlockHeader"></foldable-block-header>`
    },

    {
      name: "header-value",
      description: "Sets the value of the foldable block header.",
      required: false,
      mappedInputAttribute: "headerValue",
      type: "string",
      example: `<foldable-block-header header-value="Example Header" id="exampleFoldableBlockHeader"></foldable-block-header>`
    },
  ], "foldable-block-header"),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-block",
};
