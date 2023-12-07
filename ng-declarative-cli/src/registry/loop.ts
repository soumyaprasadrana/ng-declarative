import { validateBoolean } from "./utils";

export const metadata = {
  tag: "loop",
  attributes: [
    {
      name: "data-source",
      required: false,
      skipdomprocessing: true,
      requiredIfAttributeNotPresent: ["items", "inner-loop-items"],
      type: "string",
    },
    {
      name: "items",
      required: false,
      skipdomprocessing: true,
      requiredIfAttributeNotPresent: ["data-source", "inner-loop-items"],
      type: "string",
    },
    {
      name: "inner-loop",
      required: false,
      skipdomprocessing: true,
      validate: validateBoolean,
      allowedvalues: "true | false",
      type: "boolean",
    },
    {
      name: "inner-loop-items",
      required: false,
      requiredIf: "inner-loop==true",
      mappedInputAttribute: "innerLoopItems",
      type: "string",
    },
    {
      name: "outer-loop-item",
      required: false,
      mappedInputAttribute: "outerLoopItem",
      type: "string",
    },
    {
      name: "outer-loop-index",
      required: false,
      mappedInputAttribute: "outerLoopIndex",
      type: "string",
    },
    {
      name: "variable-name",
      required: false,
      skipdomprocessing: true,
      type: "string",
    },
    {
      name: "track-variable",
      required: false,
      skipdomprocessing: true,
      type: "string",
    },
  ],
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-loop",
};
