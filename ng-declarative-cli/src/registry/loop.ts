export const metadata = {
  tag: "loop",
  attributes: [
    {
      name: "data-source",
      required: false,
      skipdomprocessing: true,
      requiredIfAttributeNotPresent: "items",
      type: "string",
    },
    {
      name: "items",
      required: false,
      skipdomprocessing: true,
      requiredIfAttributeNotPresent: "data-source",
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
  allowedChildren: [ "*" ],
  declarativeComponentTag: "ng-declarative-loop",
};
