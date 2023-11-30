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
      name: "ngbAccordionHeader",
      required: false,
      type: "directive",
    },
    {
      name: "header-value",
      required: false,
      mappedInputAttribute: "headerValue",
      type: "string",
    },
  ]),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-block",
};
