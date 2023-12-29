import {

  getBlockAttributes,

} from "./utils";

export const metadata = {
  tag: "tab-content",
  type: "WIDGET",
  parent: "tab",
  description: "Body slot in a tab component.",
  attributes: [
    {
      name: "ngbNavContent",
      description: "Associates the tab component with a ngbNavContent directive.",
      required: false,
      type: "directive",
      example: `<tab-body ></tab-body>`
    },
  ],
  allowedChildren: ["*"],
  allowedInParent: ["tab"],
  declarativeComponentTag: "ng-template",
};
