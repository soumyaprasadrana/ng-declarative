import { getBaseAttributes } from "./utils";

export const metadata = {
    tag: "table",
    type: "WIDGET",
    description: "Represents tabular data.",
    attributes: getBaseAttributes([
        {
            name: "dataset",
            description: "Specifies the name of the dataset used for populating the table.",
            required: true,
            mappedInputAttribute: "datasetName",
            type: "string",
            example: `<table dataset="employees">...</table>`
        },

        {
            name: "table-options",
            description: "Provides options for configuring the table.",
            required: false,
            mappedInputAttribute: "tableOptions",
            type: "string",
            objectbinding: true,
            example: `<table table-options="{ sortable: true, filterable: false }">...</table>`
        },

    ], "table"),
    allowedChildren: ["*"],
    declarativeComponentTag: "ng-declarative-table",
};
