import {
  addChildToDOMElement,
  getBlockAttributes,
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
  attributes: getBlockAttributes([


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
