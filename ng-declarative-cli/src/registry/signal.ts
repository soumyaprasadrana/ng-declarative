export const metadata = {
  tag: "signal",
  type: "DATA",
  descritpion: "Angular signal to manage state of the application easily.",
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
