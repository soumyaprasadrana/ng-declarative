import {
  getBaseAttributes,
  transformDeclarativeFontWeight,
  transformDeclarativeKeywordsWithPxValues,
  transformHeight,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "alert",
  attributes: getBaseAttributes([

    {
      name: "font-size",
      required: false,
      mappedInputAttribute: "fontSize",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
    },
    {
      name: "text-color",
      required: false,
      mappedInputAttribute: "color",
      type: "string",
    },
    {
      name: "font-weight",
      required: false,
      mappedInputAttribute: "fontWeight",
      type: "string",
      allowedValues:
        "thin | extra-light | light | normal | medium | semi-bold | bold | extra-bold | heavy",
      transform: transformDeclarativeFontWeight,
    },
    {
      name: "text",
      required: true,
      mappedInputAttribute: "text",
      type: "string",
    },
    {
      name: "type",
      required: true,
      mappedInputAttribute: "text",
      type: "string",
      allowedValue: "success | info | warning | danger | primary | secondary | light | dark ",
      validate: (value: any) => {
        return (value == "success" || value == "info" || value == "warning" || value == "danger" || value == "primary" || value == "secondary" || value == "light" || value == "dark") ? true : false;
      }
    },
    {
      name: "can-be-closed",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "dismiss",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
    },

  ]),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-alert",
};
