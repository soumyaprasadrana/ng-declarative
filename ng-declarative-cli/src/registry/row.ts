import {
  getBaseAttributes,
} from "./utils";

export const metadata = {
  tag: "row",
  attributes: getBaseAttributes([
    {
      name: "row-cols",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "rowCols",
      type: "string",
      example: `<row row-cols="2"></row>`
    },
    {
      name: "order",
      description: "Set the order for a row",
      required: false,
      mappedInputAttribute: "rowOrder",
      type: "string",
      example: `<row order="2"></row>`
    },
    {
      name: "row-cols-sm",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "rowColsBreakpointSmall",
      type: "string",
      example: `<row row-cols="2"></row>`
    },
    {
      name: "row-cols-md",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "rowColsBreakpointSmall",
      type: "string",
      example: `<row row-cols="2"></row>`
    },
    {
      name: "row-cols-xs",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "rowColsBreakpointXtraSmall",
      type: "string",
      example: `<row row-cols="2"></row>`
    },
    {
      name: "row-cols-lg",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "rowColsBreakpointLarge",
      type: "string",
      example: `<row row-cols="2"></row>`
    },
    {
      name: "row-cols-xl",
      description: "Associates the row cols grid feature to he application",
      required: false,
      mappedInputAttribute: "rowColsBreakpointXtraLarge",
      type: "string",
      example: `<row row-cols="2"></row>`
    },
    {
      name: "align-items",
      description: "Align Items in a grid",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | center | end",
      validate: (value: any) => {
        return value == "start" || value == "center" || value == "end"
      },
      example: `<container align-items="start"></container>`
    },
    {
      name: "justify-contents",
      description: "Justify contents in a grid",
      required: false,
      mappedInputAttribute: "justifyContents",
      type: "string",
      allowedValues: "start | center | end | around | between | evenly",
      validate: (value: any) => {
        return value == "start" || value == "center" || value == "end" || value == "around" || value == "between" || value == "evenly"
      },
      example: `<container justify-contents="start"></container>`
    },
  ], "row"),
  allowedChildren: ["*"],
  declarativeComponentTag: "ng-declarative-row",
};
