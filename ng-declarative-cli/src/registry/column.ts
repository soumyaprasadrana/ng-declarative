import {
  getBaseAttributes,
} from "./utils";

export const metadata = {
  tag: "column",
  attributes: getBaseAttributes([
    {
      name: "size",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "colSize",
      type: "string",
      example: `<column size="2"></column>`
    },
    {
      name: "order",
      description: "Set the order for a row",
      required: false,
      mappedInputAttribute: "colOrder",
      type: "string",
      example: `<col order="2"></col>`
    },
    {
      name: "viewport-sm",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "breakpointSmall",
      type: "string",
      example: `<row viewport-sm="2"></row>`
    },
    {
      name: "viewport-md",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "breakpointMedium",
      type: "string",
      example: `<row viewport="2"></row>`
    },
    {
      name: "viewport-xs",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "breakpointXtraSmall",
      type: "string",
      example: `<row viewport="2"></row>`
    },
    {
      name: "viewport-lg",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "breakpointLarge",
      type: "string",
      example: `<row viewport="2"></row>`
    },
    {
      name: "viewport-xl",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "breakpointXtraLarge",
      type: "string",
      example: `<row viewport="2"></row>`
    },
    {
      name: "align-self",
      description: "Align  Self Items in a grid",
      required: false,
      mappedInputAttribute: "alignSelf",
      type: "string",
      allowedValues: "start | center | end",
      validate: (value: any) => {
        return value == "start" || value == "center" || value == "end"
      },
      example: `<container align-self="start"></container>`
    },

  ], "column"),
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-col",
};
