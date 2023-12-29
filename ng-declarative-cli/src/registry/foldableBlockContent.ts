import {
  getBlockAttributes,
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
  attributes: getBlockAttributes([

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
