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
      description: "Specifies the text content of the link.",
      required: true,
      mappedInputAttribute: "label",
      type: "string",
      example: `<link label="Home">Home</link>`
    },

    {
      name: "font-weight",
      description: "Sets the font weight of the link.",
      required: false,
      mappedInputAttribute: "fontWeight",
      type: "string",
      allowedValues: "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: `<link font-weight="bold">Bold Link</link>`
    },

    {
      name: "font-size",
      description: "Sets the font size of the link.",
      required: false,
      mappedInputAttribute: "fontSize",
      type: "string",
      allowedValues: "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: `<link font-size="medium">Medium-sized Link</link>`
    },

    {
      name: "text-color",
      description: "Sets the text color of the link.",
      required: false,
      mappedInputAttribute: "color",
      type: "string",
      example: `<link text-color="#007bff">Colored Link</link>`
    },

    {
      name: "route",
      description: "Defines the route link for the link component.",
      required: false,
      mappedInputAttribute: "routerLinkObject",
      objectbinding: true,
      type: "string",
      transform: (value: any) => `['${value}']`,
      requiredIfAttributeNotPresent: "url",
      example: `<link route="home">Home</link>`
    },

    {
      name: "url",
      description: "Specifies the URL for the link component.",
      required: false,
      mappedInputAttribute: "href",
      type: "string",
      requiredIfAttributeNotPresent: "route",
      example: `<link url="/home">Home</link>`
    },

    {
      name: "window",
      description: "Specifies the target window or frame for the link.",
      required: false,
      mappedInputAttribute: "target",
      type: "string",
      example: `<link window="_blank">Open in New Window</link>`
    },

    {
      name: "theme",
      description: "Sets the theme for the link.",
      required: false,
      mappedInputAttribute: "theme",
      type: "string",
      example: `<link theme="default">Default Link</link>`
    },
  ], "link"),
  allowedChildren: ["label"],
  declarativeComponentTag: "ng-declarative-link",
};
