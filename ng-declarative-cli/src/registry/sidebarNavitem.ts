import {
  getBaseAttributes,
  transformDeclarativeKeywordsWithPxValues,
  transformDeclarativeKeywordsWithPxValuesForBorder,
  transformHeight,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "sidebar-navitem",
  type: "WIDGET",
  parent: "sidebar",
  description: "A navigation item.",
  attributes: getBaseAttributes([
    {
      name: "route",
      description: "Specify the route of for a nav item",
      required: false,
      mappedInputAttribute: "route",
      type: "string",
      example: `<sidebar-navitem route="/route2"/>`
    },
    {
      name: "label",
      description: "Specify the label of a nav item",
      required: false,
      mappedInputAttribute: "label",
      requiredIfAttributeNotPresent: ["icon"],
      type: "string",
      example: `<sidebar-navitem label="Example"/>`
    },
    {
      name: "icon",
      description: "Specify the icon of a nav item",
      required: false,
      mappedInputAttribute: "icon",
      requiredIfAttributeNotPresent: ["label"],
      type: "string",
      example: `<sidebar-navitem icon="bi bi-plus"/>`
    },
    {
      name: "sub-items",
      description: "Specify the sub items of a nav item",
      required: false,
      mappedInputAttribute: "subItems",
      objectbinding: true,
      type: "object",
      example: `<sidebar-navitem sub-items="appCtrl.subItems"/>`
    },

  ], "sidebar-navitem"),
  allowedChildren: null,
  allowedInParent: ["sidebar-start", "sidebar-end", "sidebar-center"],
  declarativeComponentTag: "ng-declarative-sidebar-navitem",
};
