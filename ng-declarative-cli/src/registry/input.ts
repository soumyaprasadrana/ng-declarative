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
      description: "Sets the theme for the input.",
      required: true,
      mappedInputAttribute: "theme",
      type: "string",
      example: `<input theme="default" id="exampleInput">`
    },

    {
      name: "font-size",
      description: "Sets the font size of the input.",
      required: false,
      mappedInputAttribute: "fontSize",
      type: "string",
      allowedValues: "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: `<input font-size="medium" id="exampleInput">`
    },

    {
      name: "text-color",
      description: "Sets the text color of the input.",
      required: false,
      mappedInputAttribute: "color",
      type: "string",
      example: `<input text-color="#333" id="exampleInput">`
    },

    {
      name: "font-weight",
      description: "Sets the font weight of the input.",
      required: false,
      mappedInputAttribute: "fontWeight",
      type: "string",
      allowedValues: "thin | extra-light | light | normal | medium | semi-bold | bold | extra-bold | heavy",
      transform: transformDeclarativeFontWeight,
      example: `<input font-weight="bold" id="exampleInput">`
    },

    {
      name: "label",
      description: "Sets the label for the input.",
      required: false,
      mappedInputAttribute: "label",
      type: "string",
      example: `<input label="Username" id="exampleInput">`
    },

    {
      name: "placeholder",
      description: "Sets the placeholder text for the input.",
      required: false,
      mappedInputAttribute: "placeholder",
      type: "string",
      example: `<input placeholder="Enter your name" id="exampleInput">`
    },

    {
      name: "help",
      description: "Provides additional help text for the input.",
      required: false,
      mappedInputAttribute: "help",
      type: "string",
      example: `<input help="This field is required" id="exampleInput">`
    },

    {
      name: "input-class",
      description: "Sets custom CSS classes for the input.",
      required: false,
      mappedInputAttribute: "inputClass",
      type: "string",
      example: `<input input-class="custom-input" id="exampleInput">`
    },

    {
      name: "label-css-class",
      description: "Sets custom CSS classes for the input label.",
      required: false,
      mappedInputAttribute: "labelCssClass",
      type: "string",
      example: `<input label-css-class="custom-label" id="exampleInput">`
    },

    {
      name: "prepend-text",
      description: "Adds text to the beginning of the input.",
      required: false,
      mappedInputAttribute: "prependText",
      type: "string",
      example: `<input prepend-text="$" id="exampleInput">`
    },

    {
      name: "prepend-icon-class",
      description: "Adds icon to the beginning of the input.",
      required: false,
      mappedInputAttribute: "prependIcon",
      type: "string",
      example: `<input prepend-icon-class="bi bi-arrow-down" id="exampleInput">`
    },

    {
      name: "model",
      description: "Binds the input value to a model.",
      required: false,
      mappedInputAttribute: "inputModel",
      type: "string",
      twowaybinding: "true",
      validate: (value: any) => {
        return value.includes("app.") || value.includes("appCtrl.") || value.includes("routeCtrl.");
      },
      requiredIfAttributeNotPresent: ["dataset", "signal"],
      example: `<input model="userName" id="exampleInput">`
    },
    {
      name: "signal",
      description: "Binds the signal to the input.",
      required: false,
      mappedInputAttribute: "signal",
      type: "object",
      objectbinding: "true",
      requiredIfAttributeNotPresent: ["dataset", "model"],
      example: `<input signal="userName" id="exampleInput">`
    },

    {
      name: "dataset",
      description: "Binds the input value to a dataset.",
      required: false,
      mappedInputAttribute: "dataset",
      type: "string",
      requiredIfAttributeNotPresent: ["model", "signal"],
      example: `<input dataset="userData" id="exampleInput">`
    },

    {
      name: "attribute-name",
      description: "Specifies the attribute name when using a model.",
      required: false,
      mappedInputAttribute: "attributeName",
      type: "string",
      requiredIfAttributePresent: ["model", "signal"],
      example: `<input attribute-name="username" [model]="userName" id="exampleInput">`
    },

    {
      name: "dataset-key",
      description: "Specifies the key in the dataset when using a dataset.",
      required: false,
      mappedInputAttribute: "datasetKey",
      type: "string",
      example: `<input dataset-key="name" [dataset]="userData" id="exampleInput">`
    },

    {
      name: "dataset-attribute",
      description: "Specifies the attribute in the dataset when using a dataset.",
      required: false,
      mappedInputAttribute: "datasetattribute",
      type: "string",
      requiredIfAttributePresent: "dataset",
      example: `<input dataset-attribute="username" [dataset]="userData" id="exampleInput">`
    },

    {
      name: "required",
      description: "Specifies if the input is required.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "required",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<input required="true" id="exampleInput">`
    },

    {
      name: "disable-border",
      description: "Disables the input border.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "disableInputBorder",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<input disable-border="true" id="exampleInput">`
    },

    {
      name: "validators",
      description: "Specifies predefined validations for the input.",
      required: false,
      mappedInputAttribute: "predefinedValidations",
      type: "string",
      example: `<input validators="email" id="exampleInput">`
    },
  ], "input"),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-input",
};
