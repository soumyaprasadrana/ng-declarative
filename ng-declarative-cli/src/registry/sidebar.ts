import {
  getBaseAttributes,
  transformDeclarativeKeywordsWithPxValues,
  transformDeclarativeKeywordsWithPxValuesForBorder,
  transformHeight,
  transformWidth,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "sidebar",
  type: "WIDGET",
  description: "Side bar component.",
  attributes: getBaseAttributes([


  ], "sidebar"),
  allowedChildren: ["sidebar-start", "sidebar-center", "sidebar-end", "sidebar-content"],
  declarativeComponentTag: "ng-declarative-sidebar",
};
