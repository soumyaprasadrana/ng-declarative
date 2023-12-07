import { validateBoolean } from "./utils";

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
      name: "pre-load",
      required: false,
      mappedInputAttribute: "preLoad",
      type: "boolean",
      validate: validateBoolean,
      allowedValues: "true | false"
    }, {
      name: "auto-upgrade",
      required: false,
      mappedInputAttribute: " autoupgrade",
      type: "boolean",
      validate: validateBoolean,
      allowedValues: "true | false"
    },
    {
      name: "type",
      required: true,
      mappedInputAttribute: "type",
      allowedvalues: "json | url | json-file",
      validate: (value: any) => {
        return value == "json" || value == "url" || value == "json-file";
      },
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
