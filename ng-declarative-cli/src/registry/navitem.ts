import {
  getBaseAttributes,
  transformDeclarativeKeywordsWithPxValues,
  transformDeclarativeKeywordsWithPxValuesForBorder,
  transformHeight,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "navitem",
  type: "WIDGET",
  parent: "navbar",
  description: "A navigation item.",
  attributes: getBaseAttributes([
    {
      name: "route",
      description: "Specify the route of for a nav item",
      required: true,
      mappedInputAttribute: "route",
      type: "string",
      example: `<navitem route="/route2"/>`
    },
    {
      name: "label",
      description: "Specify the label of a nav item",
      required: false,
      mappedInputAttribute: "label",
      type: "string",
      example: `<navitem label="Example"/>`
    },

  ], "navitem"),
  allowedChildren: null,
  allowedInParent: ["navbar-start", "navbar-end", "navbar-center"],
  declarativeComponentTag: "ng-declarative-navitem",
};
