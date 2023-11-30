import {
  getBaseAttributes,
  transformDeclarativeFontWeight,
  transformDeclarativeKeywordsWithPxValues,
  transformHeight,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "input",
  attributes: getBaseAttributes([
    {
      name: "theme",
      required: true,
      mappedInputAttribute: "theme",
      type: "string",
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
      name: "label",
      required: false,
      mappedInputAttribute: "label",
      type: "string",
    },
    {
      name: "placeholder",
      required: false,
      mappedInputAttribute: "placeholder",
      type: "string",
    },
    {
      name: "help",
      required: false,
      mappedInputAttribute: "help",
      type: "string",
    },
    {
      name: "input-class",
      required: false,
      mappedInputAttribute: "inputClass",
      type: "string",
    },
    {
      name: "label-css-class",
      required: false,
      mappedInputAttribute: "labelCssClass",
      type: "string",
    },
    {
      name: "prepend-text",
      required: false,
      mappedInputAttribute: "prependText",
      type: "string",
    },
    {
      name: "model",
      required: false,
      mappedInputAttribute: "inputModel",
      type: "string",
      twowaybinding: "true",
      validate: (value: any) => {
        return value.includes("app.") || value.includes("appCtrl.") || value.includes("routeCtrl.");
      },
      requiredIfAttributeNotPresent: "dataset"
    },
    {
      name: "dataset",
      required: false,
      mappedInputAttribute: "dataset",
      type: "string",
      requiredIfAttributeNotPresent: "model"
    },
    {
      name: "attribute-name",
      required: false,
      mappedInputAttribute: "attributeName",
      type: "string",
      requiredIfAttributePresent: "model"
    },
    {
      name: "dataset-key",
      required: false,
      mappedInputAttribute: "datasetKey",
      type: "string",
    },
    {
      name: "dataset-attribute",
      required: false,
      mappedInputAttribute: "datasetattribute",
      type: "string",
      requiredIfAttributePresent: "dataset",
    },
    {
      name: "required",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "required",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,

    },
    {
      name: "disable-border",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "disableInputBorder",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,

    },
    {
      name: "validators",
      required: false,
      mappedInputAttribute: "predefinedValidations",
      type: "string",
    },
  ]),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-input",
};
