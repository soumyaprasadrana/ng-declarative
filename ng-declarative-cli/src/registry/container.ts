import {
  getBaseAttributes,
} from "./utils";

export const metadata = {
  tag: "container",
  type: "LAYOUT",
  description: "A bootstrap configurable container.",
  attributes: getBaseAttributes([
    {
      name: "size",
      description: "Sets the size of a container",
      required: false,
      mappedInputAttribute: "size",
      type: "string",
      allowedValues: "small | medium | large | xtralarge | xtraxtralarge | full",
      validate: (value: any) => {
        return value == "small" || value == "medium" || value == "large" || value == "xtralarge" || value == "xtraxtralarge" || value == "full";
      },
      example: `<container size="large"></container>`
    },

  ], "container"),
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-container",
};
