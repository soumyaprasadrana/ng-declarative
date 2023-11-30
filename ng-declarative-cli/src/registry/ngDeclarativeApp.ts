export const metadata = {
  tag: "ng-declarative-app",
  attributes: [
    {
      name: "title",
      required: false,
      mappedInputAttribute: "title",
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
  allowedChildren: ["route", "signal", "dataset"],
  declarativeComponentTag: "ng-declarative-app",
};
