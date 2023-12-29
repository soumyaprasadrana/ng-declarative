import {
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "form",
  type: "FORM",
  description: "Represents an HTML form",

  attributes: getBaseAttributes([
    {
      name: "direction",
      description: "Sets the layout direction of the form.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<form direction="column" id="exampleForm"></form>`
    },

    {
      name: "manage-children",
      description: "Determines whether the form should manage its children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<form manage-children="true" id="exampleForm"></form>`
    },

    {
      name: "children-sizes",
      description: "Sets the sizes of the form's children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<form children-sizes="50% 50%" id="exampleForm"></form>`
    },

    {
      name: "children-flex-sizes",
      description: "Sets the flex values of the form's children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<form children-flex-sizes="1 2" id="exampleForm"></form>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the form.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      defaultValue: "center",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<form align-items="center" id="exampleForm"></form>`
    },

    {
      name: "justify-contents",
      description: "Justifies the content of the form.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<form justify-contents="space-between" id="exampleForm"></form>`
    },

    {
      name: "skip-flex",
      description: "Determines whether the form should skip flex classes.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<form skip-flex="true" id="exampleForm"></form>`
    },

    {
      name: "action",
      description: "Sets the action for the form.",
      required: false,
      mappedInputAttribute: "formAction",
      type: "string",
      example: `<form action="appCtrl.submitForm" id="exampleForm"></form>`
    }

  ], "form"),
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-form",
};
