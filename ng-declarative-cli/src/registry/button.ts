import { getBaseAttributes } from "./utils";

export const metadata = {
    tag: "button",
    type: "UI",
    description: "Represents a clickable button.",
    attributes: getBaseAttributes([

        {
            name: "theme",
            required: false,
            mappedInputAttribute: "theme",
            allwedValues: "'primary | secondary | success | danger | warning | info | light | dark | link | outline-primary | outline-secondary | outline-success | outline-danger | outline-warning | outline-info | outline-light | outline-dark'",
            type: "string",
        },
        {
            name: "type",
            required: false,
            mappedInputAttribute: "type",
            defaultValue: "submit",
            type: "string",
        },
        {
            name: "label",
            requiredIfAttributeNotPresent: ["icon"],
            mappedInputAttribute: "label",
            type: "string",
        },
        {
            name: "route",
            required: false,
            mappedInputAttribute: "route",
            type: "string",
        },
        {
            name: "icon",
            required: false,
            requiredIfAttributeNotPresent: ["label"],
            mappedInputAttribute: "iconClass",
            type: "string",
        },
        {
            name: "on-click-event",
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
        }
    ], "button"),
    allowedChildren: null,
    declarativeComponentTag: "ng-declarative-button",
};
