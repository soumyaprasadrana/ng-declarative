export const metadata = {
  tag: "ng-declarative-app",
  type: "ROOT",
  description: "The root component for the ng-declarative application.",
  attributes: [
    {
      name: "base-href",
      required: false,
      mappedInputAttribute: "baseHref",
      type: "string",
    },
    {
      name: "name",
      required: false,
      mappedInputAttribute: "name",
      type: "string",
    },
    {
      name: "controller",
      required: false,
      mappedInputAttribute: "controller",
      type: "string",
    },
  ],
  allowedChildren: ["route", "signal", "dataset", "dataobject", "navbar"],
  declarativeComponentTag: "ng-declarative-app",
};
