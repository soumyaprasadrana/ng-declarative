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
        return "12px";
      case "thicker":
        return "20px";
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

export function getBaseAttributes(addtionalAttributesList: any) {
  const baseAtrrList = [
    {
      name: "background-color",
      description: "Sets background color to a component",
      required: false,
      mappedInputAttribute: "backgroundColor",
      type: "string",
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
    },
    {
      name: "border-bottom",
      description: "Sets border bottm to a component",
      required: false,
      mappedInputAttribute: "borderBottom",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValuesForBorder,
    },
    {
      name: "border-color",
      required: false,
      mappedInputAttribute: "borderColor",
      type: "string",
    },
    {
      name: "padding",
      required: false,
      mappedInputAttribute: "padding",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
    },
    {
      name: "padding-start",
      required: false,
      mappedInputAttribute: "padding",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: function transform(value: any) {
        return (
          " 0px 0px 0px " + transformDeclarativeKeywordsWithPxValues(value)
        );
      },
    },
    {
      name: "padding-top",
      required: false,
      mappedInputAttribute: "padding",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: function transform(value: any) {
        return (
          transformDeclarativeKeywordsWithPxValues(value) + " 0px 0px 0px "
        );
      },
    },
    {
      name: "padding-end",
      required: false,
      mappedInputAttribute: "padding",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: function transform(value: any) {
        return (
          " 0px " +
          transformDeclarativeKeywordsWithPxValues(value) +
          " 0px 0px "
        );
      },
    },
    {
      name: "padding-bottom",
      required: false,
      mappedInputAttribute: "padding",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: function transform(value: any) {
        return (
          " 0px opx " +
          transformDeclarativeKeywordsWithPxValues(value) +
          " 0px "
        );
      },
    },
    {
      name: "margin",
      required: false,
      mappedInputAttribute: "margin",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: transformDeclarativeKeywordsWithPxValues,
    },
    {
      name: "margin-top",
      required: false,
      mappedInputAttribute: "margin",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: function transform(value: any) {
        return (
          transformDeclarativeKeywordsWithPxValues(value) + " 0px 0px 0px "
        );
      },
    },
    {
      name: "margin-end",
      required: false,
      mappedInputAttribute: "margin",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: function transform(value: any) {
        return (
          " 0px " +
          transformDeclarativeKeywordsWithPxValues(value) +
          " 0px 0px "
        );
      },
    },
    {
      name: "margin-bottom",
      required: false,
      mappedInputAttribute: "margin",
      type: "string",
      allowedValues:
        "none | minimal | small | medium | large | extra-large | thick | thicker",
      transform: function transform(value: any) {
        return (
          " 0px opx " +
          transformDeclarativeKeywordsWithPxValues(value) +
          " 0px "
        );
      },
    },
    {
      name: "css-class",
      required: false,
      mappedInputAttribute: "customClass",
      type: "string",
    },
    {
      name: "height",
      required: false,
      mappedInputAttribute: "height",
      type: "string",
      allowedValues:
        "auto | short | small | compact | mid | medium | tall | high | super-high | ultra-high | full",
      transform: transformHeight,
    },
    {
      name: "width",
      required: false,
      mappedInputAttribute: "width",
      type: "string",
      allowedValues:
        "auto | slim | narrow | compact | mid | medium | wide | spacious | broad | extensive | full",
      transform: transformWidth,
    },
    {
      name: "transition",
      required: false,
      mappedInputAttribute: "transition",
      type: "string",
    },
    {
      name: "transition-duration",
      required: false,
      mappedInputAttribute: "transitionDuration",
      type: "string",
      transform: transformTransitionDuration,
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
      }
    },
    {
      name: "on-click-args",
      required: false,
      mappedInputAttribute: "onClickEventArgs",
      type: "object",
      bindingtransform: (value: any) => {
        if (exports.isBindingString(value)) {
          return "[" + exports.removeBindingCharacters(value) + "]";
        } else {
          return value;
        }
      },

    },
    {
      name: "hidden",
      objectbinding: true,
      required: false,
      mappedInputAttribute: "hidden",
      type: "object",
    },
  ];

  return [...baseAtrrList, ...addtionalAttributesList];
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
