;
export function transformDeclarativeKeywordsWithPxValues(value: any) {
  if (!value.includes("define-")) {
    switch (value) {
      case "none":
        return "0";
      case "minimal":
        return "4px";
      case "small":
        return "8px";
      case "medium":
        return "16px";
      case "large":
        return "24px";
      case "extra-large":
        return "32px";
      case "thick":
        return "64px";
      case "thicker":
        return "128px";
      case "auto":
        return "auto";
      default:
        return value; // Default to the original value if not recognized
    }
  } else {
    return value.split("-")[1];
  }
}
//FontWeight
export function transformDeclarativeFontWeight(value: any) {
  if (!value.includes("define-")) {
    switch (value) {
      case "thin":
        return 100;
      case "extra-light":
        return 200;
      case "light":
        return 300;
      case "normal":
        return 400;
      case "medium":
        return 500;
      case "semi-bold":
        return 600;
      case "bold":
        return 700;
      case "extra-bold":
        return 800;
      case "heavy":
        return 900;
      default:
        return 400; // Default to normal (400) if not recognized
    }
  } else {
    return value.split("-")[1];
  }
}
//Border
export function transformDeclarativeKeywordsWithPxValuesForBorder(value: any) {
  if (!value.includes("define-")) {
    switch (value) {
      case "none":
        return "0";
      case "minimal":
        return "1px solid";
      case "small":
        return "2px solid";
      case "medium":
        return "4px solid";
      case "large":
        return "8px solid";
      case "extra-large":
        return "16px solid";
      case "thick":
        return "18px solid";
      case "thicker":
        return "20px solid";
      default:
        return value; // Default to the original value if not recognized
    }
  } else {
    return value.split("-")[1];
  }
}

// For justifyContent
export function transformJustifyContent(value: string): string {
  if (!value.includes("define-")) {
    switch (value) {
      case "start":
      case "end":
      case "center":
      case "right":
      case "left":
      case "space-between":
      case "space-around":
      case "space-evenly":
        return value;
      default:
        return "flex-start"; // Default to "flex-start" if not recognized
    }
  } else {
    return value.split("-")[1];
  }
}

export function validateBoolean(value: any) {
  return value == "true" || value == "false" ? true : false;
}

// For alignItems
export function transformAlignItems(value: string): string {
  if (!value.includes("define-")) {
    switch (value) {
      case "start":
      case "end":
      case "center":
      case "stretch":
      case "baseline":
        return value;
      default:
        return "stretch"; // Default to "stretch" if not recognized
    }
  } else {
    return value.split("-")[1];
  }
}

// For height
export function transformHeight(value: string): string {
  if (!value.includes("define-")) {
    switch (value) {
      case "auto":
        return "auto";
      case "max-content":
        return "max-content";
      case "min-content":
        return "min-content";
      case "short":
        return "10%";
      case "small":
        return "20%";
      case "compact":
        return "30%";
      case "mid":
        return "40%";
      case "medium":
        return "50%";
      case "tall":
        return "60%";
      case "high":
        return "70%";
      case "super-high":
        return "80%";
      case "ultra-high":
        return "90%";
      case "full":
        return "100%";
      default:
        return "auto"; // Default to "auto" if not recognized
    }
  } else {
    return value.split("-")[1];
  }
}

// For width
export function transformWidth(value: string): string {
  if (!value.includes("define-")) {
    switch (value) {
      case "auto":
        return "auto";
      case "min-content":
        return "min-content";
      case "max-content":
        return "max-content"
      case "slim":
        return "10%";
      case "narrow":
        return "20%";
      case "compact":
        return "30%";
      case "mid":
        return "40%";
      case "medium":
        return "50%";
      case "wide":
        return "60%";
      case "spacious":
        return "70%";
      case "broad":
        return "80%";
      case "extensive":
        return "90%";
      case "full":
        return "100%";
      default:
        return "auto"; // Default to "auto" if not recognized
    }
  } else {
    return value.split("-")[1];
  }
}

// For Direction
export function transformDirection(value: string): string {
  switch (value) {
    case "row":
    case "column":
      return value;
    default:
      return "row"; // Default to "row" if not recognized
  }
}

export function validateDirectionResponsive(value: string): boolean {
  return value == "block-row" || value == "block-column" || value == "row" || value == "column" || value == "none";
}
export function validateDirectionResponsiveXS(value: string): boolean {
  return value == "row" || value == "column" || value == "none" || value == "block";
}

export function transformTransitionDuration(value: string): string {
  if (!value.includes("define-")) {
    switch (value) {
      case "quick":
        return "0.3s";
      case "short":
        return "0.5s";
      case "medium":
        return "1.0s";
      case "long":
        return "2s";
      default:
        return "0.5s"; // Default to "medium" duration if not recognized
    }
  } else {
    return value.split("-")[1];
  }
}

export function getBlockAttributes(addtionalAttributesList: any, componentName: any) {
  // Complete File
  const blockAttrs = getBaseAttributes([
    {
      name: "direction",
      description: "Specifies the layout direction of the block.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      example: `<${componentName} direction="row">...</${componentName}>`
    },

    {
      name: "manage-children",
      description: "Determines whether the block should manage its children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<${componentName} manage-children="true">...</${componentName}>`
    },

    {
      name: "children-sizes",
      description: "Specifies the sizes of the block's children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<${componentName} children-sizes="50% 50%">...</${componentName}>`
    },

    {
      name: "children-flex-sizes",
      description: "Specifies the flex sizes of the block's children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<${componentName} children-flex-sizes="1 2">...</${componentName}>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the block along the cross-axis.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<${componentName} align-items="center">...</${componentName}>`
    },

    {
      name: "justify-contents",
      description: "Aligns the content of the block along the main-axis.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<${componentName} justify-contents="space-between">...</${componentName}>`
    },

    {
      name: "skip-flex",
      description: "Determines whether to skip applying flex classes to the block.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "skipFlexClasses",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<${componentName} skip-flex="true">...</${componentName}>`
    },
    {
      name: "responsive",
      description: "Determines whether a block is responsive to device viewport.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "responsive",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<${componentName} responsive="true">...</${componentName}>`
    },
    {
      name: "viewport-xs",
      description: "Set the direction of flex box for xtra small breakpoint viewport (target mobile devices).",
      required: false,
      mappedInputAttribute: "viewportXS",
      type: "string",
      allowedValues: "row | column | block |  none",
      validate: validateDirectionResponsiveXS,
      example: `<${componentName} viewport-xs="none">...</${componentName}>`
    },
    {
      name: "viewport-sm",
      description: "Set the direction of flex box for small breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportSM",
      type: "string",
      allowedValues: "row | column | block-row | block-column |  none",
      validate: validateDirectionResponsive,
      example: `<${componentName} viewport-sm="column">...</${componentName}>`
    },
    {
      name: "viewport-md",
      description: "Set the direction of flex box for medium breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportMD",
      type: "string",
      allowedValues: "row | column | block-row | block-column |  none",
      validate: validateDirectionResponsive,
      example: `<${componentName} viewport-md="column">...</${componentName}>`
    },
    {
      name: "viewport-lg",
      description: "Set the direction of flex box for lg breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportLG",
      type: "string",
      allowedValues: "row | column | block-row | block-column |  none",
      validate: validateDirectionResponsive,
      example: `<${componentName} viewport-lg="column">...</${componentName}>`
    },
    {
      name: "viewport-xl",
      description: "Set the direction of flex box for xl breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportXL",
      type: "string",
      allowedValues: "row | column | block-row | block-column |  none",
      validate: validateDirectionResponsive,
      example: `<${componentName} viewport-xl="column">...</${componentName}>`
    },
    {
      name: "viewport-xxl",
      description: "Set the direction of flex box for xxl breakpoint viewport.",
      required: false,
      mappedInputAttribute: "viewportXXL",
      type: "string",
      allowedValues: "row | column | block-row | block-column |  none",
      validate: validateDirectionResponsive,
      example: `<${componentName} viewport-xxl="column">...</${componentName}>`
    },

  ], componentName);
  return [...addtionalAttributesList, ...blockAttrs];
}
export function getBaseAttributes(addtionalAttributesList: any, componentName: any) {
  // Complete File
  const baseAtrrList = [
    {
      name: "background",
      description: "Sets background  to a component",
      required: false,
      mappedInputAttribute: "background",
      type: "string",
      example: '<' + componentName + ' background="none" id="xhdy78"></' + componentName + '>',
    },
    {
      name: "background-color",
      description: "Sets background color to a component",
      required: false,
      mappedInputAttribute: "backgroundColor",
      type: "string",
      example: '<' + componentName + ' background-color="#000" id="xhdy78"></' + componentName + '>',
    },
    {
      name: "overflow",
      description: "Sets overflow to a component",
      required: false,
      mappedInputAttribute: "overflow",
      type: "string",
      example: '<' + componentName + ' overflow="hidden" id="xhdy78"></' + componentName + '>',
    },
    {
      name: "display-condition",
      description: "Sets display condition to a component",
      required: false,
      mappedInputAttribute: "*ngIf",
      type: "condition",
      transform: (inputString: any) => {
        // Replace "and" with "&&"
        const stringWithAnd = inputString.replace(/\band\b/g, '&&');

        // Replace "or" with "||"
        const finalResult = stringWithAnd.replace(/\bor\b/g, '||');

        return finalResult;

      },
      example: '<' + componentName + 'display-condition="true" id="xhdy78"></' + componentName + '>',
    },
    {
      name: "background-image",
      description: "Sets background image to a component",
      required: false,
      mappedInputAttribute: "backgroundImage",
      type: "string",
      example: '<' + componentName + ' background-image="url(\'path/to/image.extension\')" id="xhdy78"></' + componentName + '>',
    },
    {
      name: "background-position",
      description: "Sets background position to a component",
      required: false,
      mappedInputAttribute: "backgroundPosition",
      type: "string",
      example: '<' + componentName + ' background-position="center" id="xhdy78"></' + componentName + '>',
    },
    {
      name: "background-size",
      description: "Sets background size to a component",
      required: false,
      mappedInputAttribute: "backgroundSize",
      type: "string",
      example: '<' + componentName + ' background-size="cover" id="xhdy78"></' + componentName + '>',
    },
    {
      name: "background-repeat",
      description: "Sets background repeat to a component",
      required: false,
      mappedInputAttribute: "backgroundRepeat",
      type: "string",
      example: '<' + componentName + ' background-repeat="no-repeat" id="xhdy78"></' + componentName + '>',
    },
    {
      name: "border",
      description: "Sets border to a component",
      required: false,
      mappedInputAttribute: "border",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValuesForBorder,
      example: '<' + componentName + ' border="medium" id="sdj32"></' + componentName + '>',
    },
    {
      name: "border-start",
      description: "Sets border start to a component",
      required: false,
      mappedInputAttribute: "borderStart",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValuesForBorder,
      example: '<' + componentName + ' border-start="small" id="bgt54"></' + componentName + '>',
    },
    {
      name: "border-end",
      description: "Sets border end to a component",
      required: false,
      mappedInputAttribute: "borderEnd",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValuesForBorder,
      example: '<' + componentName + ' border-end="thick" id="rty76"></' + componentName + '>',
    },
    {
      name: "border-top",
      description: "Sets border top to a component",
      required: false,
      mappedInputAttribute: "borderTop",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValuesForBorder,
      example: '<' + componentName + ' border-top="large" id="zxc32"></' + componentName + '>',
    },
    {
      name: "border-bottom",
      description: "Sets border bottom to a component",
      required: false,
      mappedInputAttribute: "borderBottom",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValuesForBorder,
      example: '<' + componentName + ' border-bottom="medium" id="nhy87"></' + componentName + '>',
    },
    {
      name: "border-color",
      required: false,
      mappedInputAttribute: "borderColor",
      type: "string",
      example: '<' + componentName + ' border-color="#333" id="plm98"></' + componentName + '>',
    },
    {
      name: "padding",
      required: false,
      mappedInputAttribute: "padding",
      type: "string",
      allowedValues:
        "none | auto | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' padding="medium" id="jkl23"></' + componentName + '>',
    },
    {
      name: "padding-start",
      required: false,
      mappedInputAttribute: "paddingStart",
      type: "string",
      allowedValues:
        "none | auto | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' padding-start="thick" id="qwe76"></' + componentName + '>',
    },
    {
      name: "padding-top",
      required: false,
      mappedInputAttribute: "paddingTop",
      type: "string",
      allowedValues:
        "none | auto | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' padding-top="large" id="mnb45"></' + componentName + '>',
    },
    {
      name: "padding-end",
      required: false,
      mappedInputAttribute: "paddingEnd",
      type: "string",
      allowedValues:
        "none | auto | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' padding-end="medium" id="mki98"></' + componentName + '>',
    },
    {
      name: "padding-bottom",
      required: false,
      mappedInputAttribute: "paddingBottom",
      type: "string",
      allowedValues:
        "none | auto | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' padding-bottom="compact" id="yhn87"></' + componentName + '>',
    },
    {
      name: "margin",
      required: false,
      mappedInputAttribute: "margin",
      type: "string",
      allowedValues:
        "none | auto | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' margin="medium" id="vfr54"></' + componentName + '>',
    },
    {
      name: "margin-start",
      required: false,
      mappedInputAttribute: "marginStart",
      type: "string",
      allowedValues:
        "none | auto  | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' margin-start="slim" id="azx32"></' + componentName + '>',
    },
    {
      name: "margin-top",
      required: false,
      mappedInputAttribute: "marginTop",
      type: "string",
      allowedValues:
        "none | auto  | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' margin-top="slim" id="azx32"></' + componentName + '>',
    },
    {
      name: "margin-end",
      required: false,
      mappedInputAttribute: "marginEnd",
      type: "string",
      allowedValues:
        "none | auto  | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' margin-end="thicker" id="qwe98"></' + componentName + '>',
    },
    {
      name: "margin-bottom",
      required: false,
      mappedInputAttribute: "marginBottom",
      type: "string",
      allowedValues:
        "none | auto  | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
      example: '<' + componentName + ' margin-bottom="medium" id="poi76"></' + componentName + '>',
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      type: "string",
      example: '<' + componentName + ' css-class="my-custom-class" id="dfg43"></' + componentName + '>',
    },
    {
      name: "height",
      required: false,
      mappedInputAttribute: "height",
      type: "string",
      allowedValues:
        "auto | max-content | min-content |  short | small | compact | mid | medium | tall | high | super-high | ultra-high | full",
      transform: transformHeight,
      description: "Sets the height of a component",
      example: '<' + componentName + ' height="medium" id="sj889"></' + componentName + '>',
    },
    {
      name: "width",
      required: false,
      mappedInputAttribute: "width",
      type: "string",
      allowedValues:
        "auto | slim | narrow | compact | mid | medium | wide | spacious | broad | extensive | full",
      transform: transformWidth,
      description: "Sets the width of a component",
      example: '<' + componentName + ' width="compact" id="whd87"></' + componentName + '>',
    },
    {
      name: "transition",
      required: false,
      mappedInputAttribute: "transition",
      type: "string",
      description: "Sets the transition effect for a component",
      example: '<' + componentName + ' transition="fade" id="rfh45"></' + componentName + '>',
    },
    {
      name: "transition-duration",
      required: false,
      mappedInputAttribute: "transitionDuration",
      type: "string",
      allowedValues: "quick | short | medium | long",
      transform: transformTransitionDuration,
      description: "Sets the duration of the transition effect for a component",
      example: '<' + componentName + ' transition-duration="define-500ms" id="tyu76"></' + componentName + '>',
    },
    {
      name: "on-click",
      required: false,
      mappedInputAttribute: "onClickEvent",
      type: "object",
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
      },
      description: "Sets the click event handler for a component",
      example: '<' + componentName + ' on-click="handleClick" id="jkv54"></' + componentName + '>',
    },
    {
      name: "on-click-args",
      required: false,
      mappedInputAttribute: "onClickEventArgs",
      type: "object",
      objectbinding: true,
      description: "Sets the arguments for the click event handler of a component",
      example: '<' + componentName + ' on-click-args="[\'event\']" id="mnv32"></' + componentName + '>',
    },
    {
      name: "hidden",
      objectbinding: true,
      required: false,
      mappedInputAttribute: "hidden",
      type: "object",
      description: "Sets the visibility of a component",
      example: '<' + componentName + ' hidden="true" id="plk98"></' + componentName + '>',
    },
    {
      name: "disabled",
      objectbinding: true,
      required: false,
      mappedInputAttribute: "disabled",
      type: "object",
      description: "Sets if a component is disabled",
      example: '<' + componentName + ' hidden="true" id="plk98"></' + componentName + '>',
    },
    {
      name: "is-collapsed",
      required: false,
      mappedInputAttribute: "[(ngbCollapse)]",
      type: "object",
      description: "Sets the component to be collapsable",
      example: '<' + componentName + ' hidden="true" id="plk98"></' + componentName + '>',
    },
    {
      name: "tooltip",
      required: false,
      mappedInputAttribute: "ngbTooltip",
      type: "object",
      description: "Tooltip for a component",
      example: '<' + componentName + ' tootip="abc" id="plk98"></' + componentName + '>',
    },
    {
      name: "tooltip-placement",
      required: false,
      mappedInputAttribute: "placement",
      type: "string",
      allowedValues: "top | end | bottom | start ",
      validate: (value: any) => {
        return value == "top" || value == "end" || value == "bottom" || value == "start";
      },
      description: "Tooltip placement for a component",
      example: '<' + componentName + ' tootip="abc" tooltip-placement="end" id="plk98"></' + componentName + '>',
    },
    {
      name: "tooltip-container",
      required: false,
      mappedInputAttribute: "container",
      type: "string",
      description: "Tooltip placement container for a component",
      example: '<' + componentName + ' tootip="abc" tooltip-container="body" tooltip-placement="end" id="plk98"></' + componentName + '>',
    },
    {
      name: "collapse-horizontal",
      required: false,
      mappedInputAttribute: "[horizontal]",
      type: "boolean",
      validate: validateBoolean,
      description: "Collapse direction",
      example: '<' + componentName + ' hidden="true" id="plk98"></' + componentName + '>',
    },

  ];


  return [...addtionalAttributesList, ...baseAtrrList];
}

export function removeBindingCharacters(str: any): string {
  const bindingCharacters = "%%";

  if (str.startsWith(bindingCharacters) && str.endsWith(bindingCharacters)) {
    // Remove the binding characters from the start and end
    return str.slice(bindingCharacters.length, -bindingCharacters.length);
  }

  // Return the original string if it doesn't have the expected binding characters
  return str;
}

export function isBindingString(str: string): boolean {
  return str.startsWith("%%") && str.endsWith("%%");
}

export function updateDOMAttribute(domString: string, selector: string, attributeName: string, attributeValue: string): string {

  return '';
}

export function addChildToDOMElement(htmlString: string, parentSelector: string, childHtml: string): string {
  const parentRegex = new RegExp(`<${parentSelector}[^>]*>`);
  const parentMatch: any = htmlString.match(parentRegex);

  if (parentMatch) {
    const parentStartTag = parentMatch[0];
    const parentEndTag = `</${parentSelector}>`;

    const parentEndIndex: any = htmlString.indexOf(parentEndTag, parentMatch.index);

    if (parentEndIndex !== -1) {
      const parentContent = htmlString.substring(parentMatch.index + parentStartTag.length, parentEndIndex);
      const modifiedHtml =
        htmlString.substring(0, parentEndIndex) +
        childHtml +
        parentEndTag +
        htmlString.substring(parentEndIndex + parentEndTag.length); // Adjusted here

      return modifiedHtml;
    }
  }

  console.error(`Parent element with selector "${parentSelector}" not found.`);
  return htmlString; // Return the original HTML if the parent element is not found
}
