import metadataJSON from "./assets/metadata.json";
export class ComponentsController {

    componentsGroups = [
        {
            type: "ROOT",
            description: "Root"
        },
        {
            type: "LAYOUT",
            description: "Layout",
            isCollapsed: true,
        },
        {
            type: "UI",
            description: "UI",
            isCollapsed: true,
        },
        {
            type: "FORM",
            description: "Form",
            isCollapsed: true,
        },
        {
            type: "TEXT",
            description: "Textography",
            isCollapsed: true,
        },
        {
            type: "WIDGET",
            description: "Widgets",
            isCollapsed: true,
        },

    ];
    public currentcomponentsTableOptions: any = {
        title: "Attributes",
        columns: [{
            field: "name",
            name: "Name",
            sortable: true,
            filterable: true,
            cellClass: "text-center"

        },
        {
            field: "description",
            name: "Description",
            width: "50%",
            sortable: true,
            filterable: true,
            cellClass: "text-center"

        },
        {
            field: "type",
            name: "Type",
            sortable: true,
            filterable: true,
            cellClass: "text-center"

        },
        {
            field: "required",
            name: "Required?",
            sortable: true,
            filterable: true,
            template: (value: any) => {
                if (value == "true" || value == true) {
                    return `<i class="bi bi-check-circle-fill text-success" />`
                } else
                    return `<i class="bi bi-x-circle-fill text-danger" />`
            },
            cellClass: "text-center"


        },
        {
            field: "requiredIfAttributeNotPresent",
            name: "Required If Attributes Not Present?",
            sortable: true,
            filterable: true,
            cellClass: "text-center"

        },
        {
            field: "allowedValues",
            name: "Allowed Values",
            sortable: true,
            filterable: true,
            cellClass: "text-center"
        },
        {
            field: "example",
            name: "Example",
            sortable: true,
            filterable: true,
            template: (value: any) => {
                if (value) {

                    return `<code>${value ? this.htmlEncode(value) : ''}</code>`;
                }
                return "";

            },
            cellClass: "text-center"
        },
        ],
        sortable: true,
        pagination: false,
        pageSize: 5
    }


    sidebarSearch: any = '';
    private data: any = metadataJSON;
    _currentcomponentsTableDataset: any;
    currentComponent: any;
    constructor(private app: any) {
        this.currentcomponentsTableDataset = this.getComponentMetadata(this.data["ROOT"], "ng-declarative-app")["attributes"];
        this.currentComponent = this.getComponentMetadata(this.data["ROOT"], "ng-declarative-app");
    }
    unCollpaseSection(key: any) {
        for (var index in this.componentsGroups) {
            if (this.componentsGroups[index].type == key)
                this.componentsGroups[index].isCollapsed = false;
        }
    }
    onSearchChange(value: any) {
        console.log("DEBUG INPUT CHANGED ---", value);
        const dataTobeFiltered: any = JSON.parse(JSON.stringify(metadataJSON));

        for (var key in dataTobeFiltered) {
            dataTobeFiltered[key] = dataTobeFiltered[key].filter((obj: any) => obj.tag.includes(value));
            if (dataTobeFiltered[key].length > 0) {
                this.unCollpaseSection(key);
            }
        }
        this.data = dataTobeFiltered;

        console.log("DEBUG ====> DATA TOBE FILTERED", dataTobeFiltered)
    }
    htmlEncode(html: any) {
        // Create a temporary element (a div in this case)
        var tempElement = document.createElement('div');

        // Set the HTML content of the div
        tempElement.textContent = html;

        // Get the encoded HTML from the div
        return tempElement.innerHTML;
    }

    toggleCollapse(item: any) {
        if (typeof item.isCollapsed == "undefined") {
            item.isCollapsed = true;
        }
        else {
            item.isCollapsed = !item.isCollapsed;
        }
    }

    getComponentsArray(type: any) {

        return this.data[type];
    }
    getComponentMetadata(list: any, tag: any) {
        return list.find((item: any) => item.tag === tag);
    }

    setCurrentComponentItem(type: any, tag: any) {
        console.log("==================>>>>>>>>>>>> DEBUG setCurrentComponentItem >>>>>>>>>>>>", type, tag)
        setTimeout(() => {
            this.currentComponent = this.getComponentMetadata(this.data[type], tag);
            this.currentcomponentsTableDataset = this.getComponentMetadata(this.data[type], tag)["attributes"];
        }, 100)

    }

    set currentcomponentsTableDataset(value: any) {
        this._currentcomponentsTableDataset = value;
    }
    get currentcomponentsTableDataset() {
        return this._currentcomponentsTableDataset;
    }
}