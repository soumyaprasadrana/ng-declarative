import {
  getBaseAttributes,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "dialog",
  type: "WIDGET",
  description: "Bootstrap dialog component.",
  attributes: getBaseAttributes([

    {
      name: "theme",
      description: "Sets the theme for the dialog.",
      required: false,
      mappedInputAttribute: "theme",
      type: "string",
      example: `<dialog theme="primary"></dialog>`
    },
    {
      name: "title",
      description: "Sets the title of the dialog.",
      required: false,
      mappedInputAttribute: "dialogTitle",
      type: "string",
      example: `<dialog dialog-title="Title"></dialog>`
    },
    {
      name: "title-class",
      description: "Sets the css class to the title of the dialog.",
      required: false,
      mappedInputAttribute: "dialogTitleCssClass",
      type: "string",
      example: `<dialog dialog-title-class="app-dialog-title"></dialog>`
    },
    {
      name: "hide-close-button",
      description: "Hides dialog default close button.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "hideCloseButton",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      defaultValue: "false",
      example: `<dialog hide-close-button="true" id="exampleDialog"></dialog>`
    },
    {
      name: "animation",
      description: "Define if a dialog will be animated.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "animation",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      defaultValue: "true",
      example: `<dialog animation="true" id="exampleDialog"></dialog>`
    },
    {
      name: "area-labeled-by",
      description: "Sets the aria label by option to the dialog.",
      required: false,
      mappedInputAttribute: "ariaLabelledBy",
      type: "string",
      example: `<dialog aria-labeled-by="app-dialog-title"></dialog>`
    },
    {
      name: "fullscreen",
      description: "Define if a dialog will be shown as full screen.",
      required: false,
      mappedInputAttribute: "fullscreen",
      type: "object",
      allowedValues: "'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string",
      example: `<dialog fullscreen="true" id="exampleDialog"></dialog>`
    },
    {
      name: "centered",
      description: "If `true`, the modal will be centered vertically.",
      required: false,
      mappedInputAttribute: "centered",
      objectbinding: true,
      type: "boolean",
      defaultValue: "false",
      validate: validateBoolean,
      example: `<dialog centered="true" id="exampleDialog"></dialog>`
    },
    {
      name: "container",
      description: "A selector specifying the element all new modal windows should be appended to.",
      required: false,
      mappedInputAttribute: "container",
      type: "string | HTMLElement",
      example: `<dialog container="#modalContainer"></dialog>`
    },
    {
      name: "keyboard",
      description: "If `true`, the modal will be closed when the `Escape` key is pressed.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "keyboard",
      type: "boolean",
      defaultValue: "true",
      validate: validateBoolean,
      example: `<dialog keyboard="true" id="exampleDialog"></dialog>`
    },
    {
      name: "scrollable",
      description: "Scrollable modal content (false by default).",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "scrollable",
      type: "boolean",
      validate: validateBoolean,
      example: `<dialog scrollable="true" id="exampleDialog"></dialog>`
    },
    {
      name: "size",
      description: "Size of a new modal window.",
      required: false,
      mappedInputAttribute: "size",
      type: "'sm' | 'lg' | 'xl' | string",
      example: `<dialog size="sm" id="exampleDialog"></dialog>`
    },
    {
      name: "window-class",
      description: "A custom class to append to the modal window.",
      required: false,
      mappedInputAttribute: "windowClass",
      type: "string",
      example: `<dialog window-class="custom-modal" id="exampleDialog"></dialog>`
    },
    {
      name: "modal-dialog-class",
      description: "A custom class to append to the modal dialog.",
      required: false,
      mappedInputAttribute: "modalDialogClass",
      type: "string",
      example: `<dialog modal-dialog-class="custom-dialog" id="exampleDialog"></dialog>`
    },
    {
      name: "backdrop-class",
      description: "A custom class to append to the modal backdrop.",
      required: false,
      mappedInputAttribute: "backdropClass",
      type: "string",
      example: `<dialog backdrop-class="custom-backdrop" id="exampleDialog"></dialog>`
    }








  ], "dialog"),
  allowedChildren: ["dialog-header", "dialog-footer", "dialog-body"],
  allowedInParent: ["route"],
  declarativeComponentTag: "ng-declarative-dialog",
};
