export const metadata = {
  tag: "signal",
  attributes: [
    {
      name: "name",
      required: true,
      mappedInputAttribute: "name",
      type: "string",
    },
    {
      name: "value",
      required: false,
      mappedInputAttribute: "value",
      type: "string",
    },
    {
      name: "type",
      required: true,
      mappedInputAttribute: "value",
      type: "string",
    },
  ],
  allowedChildren: null,
  allowedInParent: ["ng-declarative-app"],
  declarativeComponentTag: null,
};
