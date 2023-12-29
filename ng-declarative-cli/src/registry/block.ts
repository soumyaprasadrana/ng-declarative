import {
  getBlockAttributes,
} from "./utils";

export const metadata = {
  tag: "block",
  type: "LAYOUT",
  description: "A block is a configurable flex box.",
  attributes: getBlockAttributes([], "block"),
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-block",
};
