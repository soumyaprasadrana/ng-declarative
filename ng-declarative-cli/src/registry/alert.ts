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
      description: "Sets the font size of the alert text.",
      required: false,
      mappedInputAttribute: "fontSize",
      type: "string",
      allowedValues: "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: `<alert font-size="medium" id="exampleAlert"></alert>`
    },

    {
      name: "text-color",
      description: "Sets the color of the alert text.",
      required: false,
      mappedInputAttribute: "color",
      type: "string",
      example: `<alert text-color="#3498db" id="exampleAlert"></alert>`
    },

    {
      name: "font-weight",
      description: "Sets the font weight of the alert text.",
      required: false,
      mappedInputAttribute: "fontWeight",
      type: "string",
      allowedValues: "thin | extra-light | light | normal | medium | semi-bold | bold | extra-bold | heavy",
      transform: transformDeclarativeFontWeight,
      example: `<alert font-weight="bold" id="exampleAlert"></alert>`
    },

    {
      name: "text",
      description: "Specifies the text content to be displayed in the alert.",
      required: true,
      mappedInputAttribute: "text",
      type: "string",
      example: `<alert text="Alert message here!" id="exampleAlert"></alert>`
    },

    {
      name: "type",
      description: "Specifies the type or style of the alert.",
      required: true,
      mappedInputAttribute: "type",
      type: "string",
      allowedValues: "success | info | warning | danger | primary | secondary | light | dark",
      validate: (value: any) => ["success", "info", "warning", "danger", "primary", "secondary", "light", "dark"].includes(value),
      example: `<alert type="info" id="exampleAlert"></alert>`
    },

    {
      name: "can-be-closed",
      description: "Determines whether the alert can be closed or dismissed.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "dismiss",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<alert can-be-closed="true" id="exampleAlert"></alert>`
    },


  ], "alert"),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-alert",
};
