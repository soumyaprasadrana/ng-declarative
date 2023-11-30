export const metadata = {
  tag: "route",
  attributes: [
    {
      name: "title",
      required: false,
      mappedInputAttribute: "title",
      type: "string",
    },
    {
      name: "uri",
      required: false,
      mappedInputAttribute: "uri",
      type: "string",
    },
    {
      name: "controller",
      required: false,
      mappedInputAttribute: "controller",
      type: "string",
    },
  ],
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-route",
};
