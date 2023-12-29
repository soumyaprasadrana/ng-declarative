import {
  getBlockAttributes,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "foldable-block",
  type: "WIDGET",
  description: "A collapsible block component.",
  attributes: getBlockAttributes([


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
