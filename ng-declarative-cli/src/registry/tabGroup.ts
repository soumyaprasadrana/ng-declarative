import {
  getBaseAttributes,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "tab-group",
  type: "WIDGET",
  description: "Bootstrap Tab component.",
  attributes: [

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
      name: "class",
      description: "Css class for tab group",
      required: false,
      defaultValue: "nav-tabs",
      mappedInputAttribute: "class",
      type: "string"
    },
    {
      name: "ngbNav",
      description: "Ngb Nav Directive",
      required: false,
      type: "directive"
    },
    {
      name: "#{id}=\"ngbNav\"",
      description: "Ngb Nav Directive",
      required: false,
      type: "directive"
    },
    {
      name: "active-id",
      description: "Defines the binding event for active id in the tab group",
      required: false,
      twowaybinding: true,
      mappedInputAttribute: "activeId",
      type: "event",

    },
  ],
  allowedChildren: ["tab"],
  declarativeComponentTag: "ul",
};
