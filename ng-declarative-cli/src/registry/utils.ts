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
        return "4px";
      case "large":
        return "8px";
      case "extra-large":
        return "16px";
      case "thick":
        return "18px";
      case "thicker":
        return "20px";
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
      required: false,
      mappedInputAttribute: "backgroundColor",
      type: "string",
    },
    {
      name: "border",
      required: false,
      mappedInputAttribute: "border",
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
    },
    {
      name: "on-click-args",
      required: false,
      mappedInputAttribute: "onClickEventArgs",
      type: "object",
    },
  ];

  return [ ...baseAtrrList, ...addtionalAttributesList ];
}
