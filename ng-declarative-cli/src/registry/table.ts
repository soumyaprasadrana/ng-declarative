import { getBaseAttributes } from "./utils";

export const metadata = {
    tag: "table",
    attributes: getBaseAttributes([
        {
            name: "dataset",
            required: true,
            mappedInputAttribute: "datasetName",
            type: "string",

        },
        {
            name: "table-options",
            required: false,
            mappedInputAttribute: "tableOptions",
            type: "string",
            objectbinding: true

        },

    ]),
    allowedChildren: null,
    declarativeComponentTag: "ng-declarative-table",
};
