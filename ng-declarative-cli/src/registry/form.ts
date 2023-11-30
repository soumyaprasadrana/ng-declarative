import {
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "form",
  attributes: getBaseAttributes([
    {
      name: "direction",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
    },
    {
      name: "manage-children",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
    },
    {
      name: "children-sizes",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
    },
    {
      name: "children-flex-sizes",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
    },
    {
      name: "align-items",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      defaultValue: "center",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
    },
    {
      name: "justify-contents",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues:
        "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
    },
    {
      name: "skip-flex",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
    },

    {
      name: "action",
      required: false,
      mappedInputAttribute: "formAction",
      type: "object",
      objectbinding: true,
      bindingtransform: (value: any) => {
        if (exports.isBindingString(value)) {
          return exports.removeBindingCharacters(value);
        } else {
          return value;
        }
      },
      bindingkeytransform: (key: any, value: any) => {
        const methodPattern = /^([\w\.]+\([^\)]*\))*$/;
        const result = methodPattern.test(value) ? "(click)" : "[" + key + "]";
        return result;
      }
    }


  ]),
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-form",
};
