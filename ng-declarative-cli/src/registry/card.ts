import {
  getBaseAttributes,
  transformDeclarativeFontWeight,
  transformDeclarativeKeywordsWithPxValues,
  transformHeight,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "card",
  type: "WIDGET",
  description: "Bootstrap card component.",
  attributes: getBaseAttributes([
    {
      name: "start-icon",
      description: "Associates an icon at the top of the card.",
      required: false,
      mappedInputAttribute: "iconTop",
      type: "string",
      example: `<card start-icon="bi bi-plus"></card>`
    },
    {
      name: "start-icon-parent-css",
      description: "Associates a css class to the icon section.",
      required: false,
      mappedInputAttribute: "iconClass",
      type: "string",
      example: `<card start-icon="bi bi-plus" icon-class="text-center"></card>`
    },
    {
      name: "start-image",
      description: "Associates an image at the top of the card.",
      required: false,
      mappedInputAttribute: "imageTop",
      type: "string",
      example: `<card start-image="/path/to/image.jpg"></card>`
    },
    {
      name: "start-image-parent-css",
      description: "Associates a css class to the parent of the image section.",
      required: false,
      mappedInputAttribute: "imageClass",
      type: "string",
      example: `<card start-icon="bi bi-plus" icon-class="text-center"></card>`
    },
    {
      name: "start-image-css",
      description: "Associates a css class to image at the top of the card.",
      required: false,
      mappedInputAttribute: "imageTopCss",
      type: "string",
      example: `<card start-image-css="start-img-css-class"></card>`
    },
    {
      name: "end-image-css",
      description: "Associates a css class to image at the bottom of the card.",
      required: false,
      mappedInputAttribute: "imageBottomCss",
      type: "string",
      example: `<card start-image-css="start-img-css-class"></card>`
    },
    {
      name: "end-image",
      description: "Associates an image at the bottom of the card.",
      required: false,
      mappedInputAttribute: "imageBottom",
      type: "string",
      example: `<card end-image="/path/to/image.jpg"></card>`
    },
    {
      name: "theme",
      description: "Sets the theme for the card.",
      required: false,
      mappedInputAttribute: "theme",
      type: "string",
      example: `<card theme="primary"></card>`
    },
    {
      name: "card-title",
      description: "Sets the title of the card.",
      required: false,
      mappedInputAttribute: "cardTitle",
      type: "string",
      example: `<card card-title="Title"></card>`
    },
    {
      name: "card-title-class",
      description: "Sets the css class to the title of the card.",
      required: false,
      mappedInputAttribute: "cardTitleCssClass",
      type: "string",
      example: `<card card-title-class="app-card-title"></card>`
    },

    {
      name: "card-subtitle",
      description: "Sets the sub-title of the card.",
      required: false,
      mappedInputAttribute: "cardSubTitle",
      type: "string",
      example: `<card card-subtitle="Sub Title"></card>`
    },
    {
      name: "card-subtitle-class",
      description: "Sets the css class to the sub-title of the card.",
      required: false,
      mappedInputAttribute: "cardSubTitleCssClass",
      type: "string",
      example: `<card card-title-class="app-card-title"></card>`
    },
    {
      name: "image-overlay",
      description: "Specifies the property if the start image will be overlayed on the card.",
      required: false,
      mappedInputAttribute: "imageOverlay",
      type: "boolean",
      validate: validateBoolean,
      example: `<card image-overlay="true"></card>`
    },

  ], "card"),
  allowedChildren: ["card-header", "card-footer", "card-body"],
  declarativeComponentTag: "ng-declarative-card",
};
