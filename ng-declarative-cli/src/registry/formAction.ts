import {
    getBaseAttributes,
    transformAlignItems,
    transformDirection,
    transformJustifyContent,
    validateBoolean,
} from "./utils";

export const metadata = {
    tag: "form-action",
    attributes: getBaseAttributes([
        {
            name: "isSuccess",
            required: false,
            mappedInputAttribute: "isHidden",
            type: "boolean",
            objectbinding: true

        },
        {
            name: "isLoading",
            required: false,
            mappedInputAttribute: "isLoading",
            type: "boolean",
            objectbinding: true

        },
        {
            name: "isError",
            required: false,
            mappedInputAttribute: "isError",
            type: "boolean",
            objectbinding: true

        },
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
            required: true,
            mappedInputAttribute: "label",
            type: "string",
        },
        {
            name: "on-submit",
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
    ], "form-action"),
    allowedChildren: null,
    declarativeComponentTag: "ng-declarative-button",
};
