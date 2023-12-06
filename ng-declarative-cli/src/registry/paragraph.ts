import {
  getBaseAttributes,
  transformDeclarativeFontWeight,
  transformDeclarativeKeywordsWithPxValues,
  transformHeight,
  transformWidth,
} from "./utils";

export const metadata = {
  tag: "paragraph",
  attributes: getBaseAttributes([
    {
      name: "font-size",
      description: "Sets the font size of the paragraph text.",
      required: false,
      mappedInputAttribute: "fontSize",
      type: "string",
      allowedValues: "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: `<paragraph font-size="medium">This is a medium-sized paragraph.</paragraph>`
    },

    {
      name: "text-color",
      description: "Sets the text color of the paragraph.",
      required: false,
      mappedInputAttribute: "color",
      type: "string",
      example: `<paragraph text-color="#333">This paragraph has a custom text color.</paragraph>`
    },

    {
      name: "font-weight",
      description: "Sets the font weight of the paragraph text.",
      required: false,
      mappedInputAttribute: "fontWeight",
      type: "string",
      allowedValues: "thin | extra-light | light | normal | medium | semi-bold | bold | extra-bold | heavy",
      transform: transformDeclarativeFontWeight,
      example: `<paragraph font-weight="bold">This is a bold paragraph.</paragraph>`
    },

    {
      name: "text",
      description: "Specifies the content of the paragraph.",
      required: false,
      mappedInputAttribute: "text",
      requiredIfAttributeNotPresent: "template",
      type: "string",
      example: `<paragraph text="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">Lorem ipsum...</paragraph>`
    },
    {
      name: "template",
      description: "Specifies the inner html of the paragraph.",
      required: false,
      requiredIfAttributeNotPresent: "text",
      mappedInputAttribute: "template",
      type: "string",
      example: `<paragraph template="<b>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b>">Lorem ipsum...</paragraph>`
    },
  ], "paragraph"),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-paragraph",
};
