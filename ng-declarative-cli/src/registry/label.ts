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
      description: "Associates the label with a specific input element using its ID.",
      required: false,
      mappedInputAttribute: "for",
      type: "string",
      example: `<label attach-with="exampleInput">Username</label>`
    },

    {
      name: "theme",
      description: "Sets the theme for the label.",
      required: false,
      mappedInputAttribute: "theme",
      type: "string",
      example: `<label theme="default">Default Label</label>`
    },

    {
      name: "callout-text",
      description: "Specifies additional text for callout-themed labels.",
      required: false,
      mappedInputAttribute: "calloutDesc",
      type: "string",
      requiredIf: 'theme==callout',
      example: `<label theme="callout" callout-text="Additional information">Callout Label</label>`
    },

    {
      name: "font-size",
      description: "Sets the font size of the label.",
      required: false,
      mappedInputAttribute: "fontSize",
      type: "string",
      allowedValues: "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: `<label font-size="medium">Medium-sized Label</label>`
    },

    {
      name: "text-color",
      description: "Sets the text color of the label.",
      required: false,
      mappedInputAttribute: "color",
      type: "string",
      example: `<label text-color="#333">Colored Label</label>`
    },

    {
      name: "font-weight",
      description: "Sets the font weight of the label.",
      required: false,
      mappedInputAttribute: "fontWeight",
      type: "string",
      allowedValues: "thin | extra-light | light | normal | medium | semi-bold | bold | extra-bold | heavy",
      transform: transformDeclarativeFontWeight,
      example: `<label font-weight="bold">Bold Label</label>`
    },

    {
      name: "text",
      description: "Specifies the text content of the label.",
      required: true,
      mappedInputAttribute: "text",
      type: "string",
      example: `<label text="Username">Username</label>`
    },

  ], "label"),
  allowedChildren: ["image"],
  declarativeComponentTag: "ng-declarative-label",
};
