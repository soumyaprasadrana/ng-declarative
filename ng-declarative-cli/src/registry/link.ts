import {
  getBaseAttributes,
  transformDeclarativeKeywordsWithPxValues,
  transformDeclarativeKeywordsWithPxValuesForBorder,
  transformHeight,
  transformWidth,
} from "./utils";

export const metadata = {
  tag: "link",
  attributes: getBaseAttributes([
    {
      name: "label",
      required: true,
      mappedInputAttribute: "label",
      type: "string",
    },
    {
      name: "font-weight",
      required: false,
      mappedInputAttribute: "fontWeight",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
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
      name: "route",
      required: false,
      mappedInputAttribute: "routerLinkObject",
      objectbinding: true,
      type: "string",
      transform: (value: any) => {
        return `['${value}']`;
      },
      requiredIfAttributeNotPresent: "url",
    },
    {
      name: "url",
      required: false,
      mappedInputAttribute: "href",
      type: "string",
      requiredIfAttributeNotPresent: "route",
    },
    {
      name: "window",
      required: false,
      mappedInputAttribute: "target",
      type: "string",
    },

    {
      name: "theme",
      required: false,
      mappedInputAttribute: "theme",
      type: "string",
    },
  ]),
  allowedChildren: [ "label" ],
  declarativeComponentTag: "ng-declarative-link",
};
