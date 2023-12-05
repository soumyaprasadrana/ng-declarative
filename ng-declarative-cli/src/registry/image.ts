import {
  getBaseAttributes,
  transformDeclarativeKeywordsWithPxValues,
  transformDeclarativeKeywordsWithPxValuesForBorder,
  transformHeight,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "link",
  attributes: getBaseAttributes([
    {
      name: "src",
      description: "Specify the source of an Image Component",
      required: false,
      mappedInputAttribute: "imageUrl",
      type: "string",
      requiredIf: "type==image",
      example: `<image src="path/to/image"/>`
    },
    {
      name: "icon",
      description: "Specify the icon css class for an Image Component",
      required: false,
      mappedInputAttribute: "iconClass",
      requiredIf: "type==icon",
      type: "string",
      example: `<image icon="bi bi-arrow-down"/>`
    },
    {
      name: "type",
      description: "Specify the source of an Image Component",
      required: true,
      mappedInputAttribute: "type",
      allowedValues: "image | icon",
      validate: (value: any) => {
        return value == "image" || value == "icon";
      },
      type: "string",
      example: `<image type="icon"/>`
    },
    {
      name: "alt-text",
      description: "Specify the alt text of an Image Component",
      required: false,
      mappedInputAttribute: "altText",
      type: "string",
      example: `<image alt-text="Example"/>`
    },

    {
      name: "responsive",
      description: "If true make an Image Component responsive.",
      required: false,
      mappedInputAttribute: "isResponsive",
      type: "boolean",
      objectbinding: true,
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<image responsive="true"/>`
    },


  ], "image"),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-image",
};
