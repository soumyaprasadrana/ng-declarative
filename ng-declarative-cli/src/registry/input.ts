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
  type: "FORM",
  description: "A configurable input component.",
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
      name: "before",
      description: "Enable to add text or icon to the before area of an input.",
      required: false,
      mappedInputAttribute: "before",
      objectbinding: true,
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<input before="true" before-text="$" id="exampleInput">`
    },
    {
      name: "before-text",
      description: "Adds text to the beginning of the input.",
      required: false,
      mappedInputAttribute: "prependText",
      type: "string",
      example: `<input before="true" before-text="$" id="exampleInput">`
    },

    {
      name: "before-on-click",
      description: "Adds text to the beginning of the input.",
      required: false,
      mappedInputAttribute: "prependOnClick",
      type: "string",
      example: `<input before="true" before-on-click="routeCtrl.invoke" id="exampleInput">`
    },
    {
      name: "before-on-click-agrs",
      description: "Adds text to the beginning of the input.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "prependOnClickArgs",
      type: "list",
      example: `<input before="true" before-on-click="routeCtrl.invoke" id="exampleInput">`
    },
    {
      name: "before-icon-class",
      description: "Adds icon to the beginning of the input.",
      required: false,
      mappedInputAttribute: "prependIcon",
      type: "string",
      example: `<input before="true" before-icon-class="bi bi-arrow-down" id="exampleInput">`
    },
    {
      name: "after",
      description: "Enable to add text or icon to the after area of an input.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "after",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<input after="true" after-text="$" id="exampleInput">`
    },
    {
      name: "after-text",
      description: "Adds text to the end of the input.",
      required: false,
      mappedInputAttribute: "afterText",
      type: "string",
      example: `<input after="true" after-text="$" id="exampleInput">`
    },

    {
      name: "after-on-click",
      description: "Adds on-click event to the after area of the input.",
      required: false,
      mappedInputAttribute: "afterOnClick",
      type: "string",
      example: `<input after="true" after-on-click="routeCtrl.invoke" id="exampleInput">`
    },
    {
      name: "after-on-click-agrs",
      description: "Adds on-click event args to the after area of the input.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "afterOnClickArgs",
      type: "list",
      example: `<input after="true" after-on-click="routeCtrl.invoke" id="exampleInput">`
    },
    {
      name: "after-icon-class",
      description: "Adds icon to the end of the input.",
      required: false,
      mappedInputAttribute: "afterIcon",
      type: "string",
      example: `<input after="true" after-icon-class="bi bi-arrow-down" id="exampleInput">`
    },
    {
      name: "password-eye",
      description: "Automatically make an input field to type password and add eye-spash icon at end.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "passwordEyeSlash",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<input password-eye="true"  id="exampleInput">`
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
      requiredIfAttributeNotPresent: ["attribute-name", "dataset", "signal"],
      example: `<input model="userName" id="exampleInput">`
    },
    {
      name: "signal",
      description: "Binds the signal to the input.",
      required: false,
      mappedInputAttribute: "signal",
      type: "object",
      objectbinding: "true",
      requiredIfAttributeNotPresent: ["dataset", "model", "attribute-name",],
      example: `<input signal="userName" id="exampleInput">`
    },

    {
      name: "dataset",
      description: "Binds the input value to a dataset.",
      required: false,
      mappedInputAttribute: "dataset",
      type: "string",
      requiredIfAttributeNotPresent: ["model", "signal", "attribute-name"],
      example: `<input dataset="userData" id="exampleInput">`
    },

    {
      name: "attribute-name",
      description: "Specifies the attribute name when using a model.",
      required: false,
      mappedInputAttribute: "attributeName",
      type: "string",
      requiredIfAttributePresent: ["model", "signal"],
      requiredIfAttributesNotPresent: ["model", "signal", "dataset"],
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
    {
      name: "on-change",
      description: "event to be invoked when the input value change.",
      required: false,
      mappedInputAttribute: "onChangeEvent",
      type: "object",
      example: `<input on-change="appCtrl.onChange" id="exampleInput">`
    }
  ], "input"),
  allowedChildren: null,
  declarativeComponentTag: "ng-declarative-input",
};
