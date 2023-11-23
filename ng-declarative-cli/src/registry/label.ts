import {
  getBaseAttributes,
  transformDeclarativeFontWeight,
  transformDeclarativeKeywordsWithPxValues,
  transformHeight,
  transformWidth,
} from "./utils";

export const metadata = {
  tag: "label",
  attributes: getBaseAttributes([
    {
      name: "attach-with",
      required: false,
      mappedInputAttribute: "for",
      type: "string",
    },
    {
      name: "theme",
      required: false,
      mappedInputAttribute: "theme",
      type: "string",
    },
    {
      name: "callout-text",
      required: false,
      mappedInputAttribute: "calloutDesc",
      type: "string",
      requiredIf: "theme==callout",
    },
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
  ]),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-label",
};
