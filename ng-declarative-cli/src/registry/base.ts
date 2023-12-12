import {
  getBaseAttributes,
} from "./utils";

export const metadata = {
  tag: "base",
  type: "ROOT",
  description: "Base component component.",
  attributes: getBaseAttributes([
  ], "base"),
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-base",
};
