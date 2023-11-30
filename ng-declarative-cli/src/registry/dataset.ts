export const metadata = {
  tag: "dataset",
  attributes: [
    {
      name: "name",
      required: true,
      mappedInputAttribute: "name",
      type: "string",
    },
    {
      name: "type",
      required: true,
      mappedInputAttribute: "type",
      type: "string",
    },
    {
      name: "src",
      objectbinding: true,
      required: true,
      mappedInputAttribute: "src",
      type: "string",
    },
    {
      name: "schema",
      objectbinding: true,
      required: false,
      mappedInputAttribute: "schema",
      type: "string",
    },
    {
      name: "data-key",
      required: false,
      mappedInputAttribute: "dataKey",
      type: "string",
    },
  ],
  allowedChildren: null,
  allowedInParent: ["ng-declarative-app", "route"],
  declarativeComponentTag: "ng-declarative-dataset",
};
