import {
  getBaseAttributes,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "tab",
  type: "WIDGET",
  description: "Bootstrap Tab component.",
  attributes: getBaseAttributes([
    {
      name: "title",
      description: "Sets the title of the tab.",
      required: true,
      mappedInputAttribute: "tabTitle",
      type: "string",
      example: `<tab tab-title="Title"></tab>`
    },
    {
      name: "title-class",
      description: "Sets the css class to the title of the tab.",
      required: false,
      mappedInputAttribute: "tabTitleCssClass",
      type: "string",
      example: `<tab tab-title-class="app-tab-title"></tab>`
    },
    {
      name: "destroy-on-hide",
      description: "Destroy tab on hide.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "destroyOnHide",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      defaultValue: "true",
      example: `<tab destroy-on-hide="false" id="exampletab"></tab>`
    },
    {
      name: "tab-id",
      description: "Defines the tab ID ",
      required: true,
      objectbinding: true,
      mappedInputAttribute: "ngbNavItem",
      type: "number",
      validate: (value: any) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
      },
      example: `<tab number="1" id="exampletab"></tab>`
    },
  ], "tab"),
  allowedChildren: ["tab-content"],
  allowedInParent: ["tab-group"],
  declarativeComponentTag: "li",
};
