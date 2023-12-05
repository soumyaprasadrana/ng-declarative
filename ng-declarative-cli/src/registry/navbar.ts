import {
  getBaseAttributes,
  transformDeclarativeKeywordsWithPxValues,
  transformDeclarativeKeywordsWithPxValuesForBorder,
  transformHeight,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "navbar",
  attributes: getBaseAttributes([
    {
      name: "brand-text",
      description: "Specify the brand text for the navbar component",
      required: true,
      mappedInputAttribute: "brandText",
      type: "string",
      example: `<navbar brand-text="Brand"/>`
    },
    {
      name: "brand-text-css-class",
      description: "Specify the brand text css class for the navbar component",
      required: false,
      mappedInputAttribute: "brandTextCssClass",
      type: "string",
      example: `<navbar brand-text-css-class="customcss"/>`
    },
    {
      name: "brand-image",
      description: "Specify the brand icon for the navbar component",
      required: false,
      mappedInputAttribute: "brandImage",
      type: "string",
      example: `<navbar brand-image="assets/brand.jpg"/>`
    },
    {
      name: "brand-icon",
      description: "Specify the brand icon for the navbar component",
      required: false,
      mappedInputAttribute: "brandIcon",
      type: "string",
      example: `<navbar brand-icon="bi arrow-up"/>`
    },

    {
      name: "color-scheme",
      description: "Specify the color scheme for the navbar component",
      required: false,
      mappedInputAttribute: "colorScheme",
      type: "string",
      allowedValues: "light | dark",
      validate: (value: any) => {
        return value == "light" || value == "dark";
      },
      example: `<navbar color-scheme="light"/>`
    },

    {
      name: "sticky",
      description: "If true a navbar will be fixed",
      required: false,
      mappedInputAttribute: "fixedTop",
      type: "boolean",
      objectbinding: true,
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<navbar fixed-top="true"/>`
    },


  ], "navbar"),
  allowedChildren: ["navbar-start", "navbar-center", "navbar-end"],
  allowedInParent: ["ng-declarative-app", "route"],
  declarativeComponentTag: "ng-declarative-navbar",
};
