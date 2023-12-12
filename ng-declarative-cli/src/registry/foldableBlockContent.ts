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
  tag: "foldable-block-content",
  type: "WIDGET",
  description: "Content within a foldable block.",
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
    const childAddedDOM =
      `
    <div ngbAccordionCollapse>
			<div ngbAccordionBody>
				<ng-template>
        ${template}
        </ng-template>
      </div>
    </div>
    
    `

    return childAddedDOM;

  },
  attributes: getBaseAttributes([
    {
      name: "width",
      description: "Sets the width of the foldable block content.",
      required: false,
      mappedInputAttribute: "width",
      type: "string",
      allowedValues: "auto | slim | narrow | compact | mid | medium | wide | spacious | broad | extensive | full",
      defaultValue: "full",
      transform: transformWidth,
      example: `<foldable-block-content width="medium" id="exampleFoldableBlockContent"></foldable-block-content>`
    },

    {
      name: "direction",
      description: "Sets the layout direction of the foldable block content's children.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<foldable-block-content direction="column" id="exampleFoldableBlockContent"></foldable-block-content>`
    },

    {
      name: "manage-children",
      description: "Determines whether the foldable block content should manage its children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<foldable-block-content manage-children="true" id="exampleFoldableBlockContent"></foldable-block-content>`
    },

    {
      name: "children-sizes",
      description: "Sets the sizes of the foldable block content's children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<foldable-block-content children-sizes="50% 50%" id="exampleFoldableBlockContent"></foldable-block-content>`
    },

    {
      name: "children-flex-sizes",
      description: "Sets the flex values of the foldable block content's children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<foldable-block-content children-flex-sizes="1 2" id="exampleFoldableBlockContent"></foldable-block-content>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the foldable block content.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<foldable-block-content align-items="center" id="exampleFoldableBlockContent"></foldable-block-content>`
    },

    {
      name: "justify-contents",
      description: "Justifies the content of the foldable block content.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<foldable-block-content justify-contents="space-between" id="exampleFoldableBlockContent"></foldable-block-content>`
    },

    {
      name: "ngbAccordionHeader",
      description: "Associates the foldable block content with an NgbAccordionHeader directive.",
      required: false,
      type: "directive",
      example: `<foldable-block-content ngbAccordionHeader="exampleAccordionHeader" id="exampleFoldableBlockContent"></foldable-block-content>`
    },

    {
      name: "header-value",
      description: "Sets the value of the foldable block content's header.",
      required: false,
      mappedInputAttribute: "headerValue",
      type: "string",
      example: `<foldable-block-content header-value="Example Header" id="exampleFoldableBlockContent"></foldable-block-content>`
    },

    {
      name: "skip-flex",
      description: "Determines whether flex classes should be skipped for the foldable block content.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      defaultValue: "true",
      example: `<foldable-block-content skip-flex="false" id="exampleFoldableBlockContent"></foldable-block-content>`
    },
  ], "foldable-block-content"),
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-block",
};
