import {
  getBaseAttributes,
  transformAlignItems,
  transformDirection,
  transformJustifyContent,
  validateBoolean,
} from "./utils";

export const metadata = {
  tag: "foldable-blocks",
  type: "WIDGET",
  description: "Collection of foldable blocks.",
  customprocess: true,
  processor: async (
    node: any,
    parentNode: any,
    metadata: any,
    transform: any,
    compiler: any
  ) => {
    const metadatas = await transform(metadata, node, compiler);
    const id = compiler.getAttributeFromNode(node, "id");

    const sourceFileTemplate = `import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  HostListener,
  ViewChild,
} from "@angular/core";
import { AnimationService } from "ng-declarative-components";
import { ApplicationService } from "ng-declarative-components";
import { Base } from "ng-declarative-components";
import { ApplicationServiceProvider } from "./app.provider.service";
@Component({
  selector: "ng-declarative-foldable-blocks-${id}",
  template: \`
    <div
      [ngClass]="blockClasses"
      [ngStyle]="blockStyle"
      [class]="customClass"
      [style.height]="height"
      [style.width]="width" 
      [closeOthers]="closeOthers"
      [destroyOnHide]="destroyOnHide"
      [animation]="disableAnimation"
      
      ngbAccordion
      #${id}="ngbAccordion"
    >
     ${metadatas.children}
    </div>
  \`,
  styles: [\`:host{
    display:contents;
  }\`],
})
export class FoldableBlocks${id} extends Base implements OnInit, AfterViewInit {
  @Input() gridColumns: string = "col-md-4";
  @Input() gridGap: string = "3";
  @Input() override backgroundColor: string = "";
  @Input() override border: string = "";
  @Input() override borderColor: string = "";
  @Input() override padding: string = "";
  @Input() override margin: string = "";
  @Input() float: string = "";
  @Input() justifyContent: string = "";
  @Input() alignItems: string = "";
  @Input() override customClass: string = "";
  @Input() override height: string = "max-content";
  @Input() override width: string = "auto";
  @Input() layoutDirection: string = "row"; // 'row' for rows, 'column' for columns
  @Input() manageChildren: boolean = false;
  @Input() childrenSizes: string = "";
  @Input() childrenFlexValues: string = "";
  @Input() responsive: boolean = true;
  @Input() override transition: string = ""; // Set the default transition to none
  @Input() override transitionDuration: string = "0.5s"; // Set the default duration to 0.5s
  @Input() disableAnimation:boolean = true;
  @Input() closeOthers:boolean = false;
  @Input() destroyOnHide: boolean = true;

  blockClasses: string = "";
  blockStyle: object = {};

  @Output() refChange: EventEmitter<FoldableBlocks${id}> = new EventEmitter<FoldableBlocks${id}>();

  //@ContentChildren('*') childBlocks: QueryList<ElementRef> | undefined;
 childBlocks!: any;

  @ViewChild("${id}") blockRef: ElementRef | undefined;

  public appCtrl:any ;
  public api:any ;  
  public routeCtrl:any;
  constructor(
     elementRef: ElementRef,
     appx: ApplicationService,
     public appPropvider: ApplicationServiceProvider
  ) {
    super(elementRef,new AnimationService(),appx);
    this.app = this.appPropvider.getApp();
    this.appCtrl = this.app.getAppController();
    this.routeCtrl = this.app.getCurrentRoute().getController();
  }

  blocks():any{
    return this.blockRef;
  }
  override ngOnInit() {
    this.blockClasses = this.getBlockClasses();
    this.blockStyle = this.getBlockStyles();
     this.childBlocks = this.elementRef.nativeElement.childNodes[0].childNodes;
  }

  override ngAfterViewInit() {
    // Emit the reference to the parent component
    this.refChange.emit(this);

    if (this.manageChildren) {
      this.setChildrenStyles();
    }

    if (this.responsive) {
      this.setResponsiveStyles();
    }

    if (this.transition && this.blockRef) {
      this.animationService.animate(
        this.transition,
        this.blockRef.nativeElement,
        this.transitionDuration
      );
    }
  }

  applyFlexToChildren() {
    if (this.childBlocks) {
      this.childBlocks.forEach((child:any) => {
        const childElement = child;
        childElement.style.flex = "1";
      });
    }
  }

  setChildrenStyles() {
    if (this.childBlocks) {
      if (this.childrenFlexValues) {
        this.setChildrenFlexValues();
      } else if (this.childrenSizes) {
        this.setChildrenWidths();
      } else {
        console.warn(
          "No children sizing or flex values specified. Defaulting to flex: 1 for all children."
        );
        this.applyFlexToChildren();
      }
    }
  }

  setChildrenFlexValues() {
    if (this.childBlocks) {
      const flexValues = this.childrenFlexValues
        .split(",")
        .map((value) => value.trim());
      this.childBlocks.forEach((child:any, index:number) => {
        const childElement = child;
        childElement.style.flex = flexValues[index] || "1";
      });
    }
  }

  setChildrenWidths() {
    if (this.childBlocks && this.childrenSizes) {
      const sizes = this.childrenSizes.split(",").map((size) => size.trim());
      this.childBlocks.forEach((child:any, index:number) => {
        const childElement = child.nativeElement;
        childElement.style.width = sizes[index] ? sizes[index] + "%" : "auto";
      });
    }
  }

  getBlockClasses(): string {
    let classes = \`d-flex gx--\${this.gridGap} gy-\${this.gridGap} \${this
      .gridColumns} \${this.customClass}\`;

    if (this.layoutDirection === "row-reverse") {
      classes += " flex-row-reverse";
    } else if (this.layoutDirection === "column") {
      classes += " flex-column";
    } else if (this.layoutDirection === "column-reverse") {
      classes += " flex-column-reverse";
    }

    return classes;
  }

  @HostListener("window:resize", [ "$event" ])
  onResize(event: Event) {
    // Handle window resize
    if (this.responsive) {
      this.setResponsiveStyles();
    }
  }

  setResponsiveStyles() {
    if (this.childBlocks) {
      if (window.innerWidth < 576) {
        // Small devices (576px and down): Set to column
        this.layoutDirection = "column";
      } else {
        // Larger devices: Reset to default layout
        this.layoutDirection = "row";
      }
    }
  }

  getBlockStyles(): { [key: string]: string } {
    let styles: any = {
      "background-color": this.backgroundColor,
      border: this.border,
      "border-color": this.borderColor,
      float: this.float,
      "justify-content": this.justifyContent,
      "align-items": this.alignItems,
      height: this.height,
      width: this.width,
    };
    if (this.padding) styles.padding = this.padding;
    if (this.margin) styles.margin = this.margin;
    return styles;
  }
}
`;
    function createAttributesString(attributes: any) {
      let content = "";
      for (let attribute of attributes) {
        if (attribute.isBinding)
          content += ` [${attribute.mappedInputAttribute}]="${attribute.value}" `;
        else {
          content += ` ${attribute.mappedInputAttribute}="${attribute.value}" `;
        }
      }
      // Adding ID Ref to host elements 
      if (!content.includes("#" + id)) {
        content = content + " " + "#" + id
      }
      return content;
    }
    compiler.addResourceTobeProcessed({
      name: `FoldableBlocks${id}`,
      filename: `FoldableBlocks${id}.component.ts`,
      src: sourceFileTemplate,
      route: compiler.getCurrentRoute(),
    });
    const templateS = `<ng-declarative-foldable-blocks-${id} ${createAttributesString(
      metadatas.attributes
    )} />`;

    return templateS;
  },
  attributes: getBaseAttributes([
    {
      name: "direction",
      description: "Sets the layout direction of the foldable blocks.",
      required: false,
      mappedInputAttribute: "layoutDirection",
      type: "string",
      allowedValues: "row | column",
      transform: transformDirection,
      defaultValue: "column",
      example: `<foldable-blocks direction="row" id="exampleFoldableBlocks"></foldable-blocks>`
    },

    {
      name: "manage-children",
      description: "Determines whether the foldable blocks should manage their children.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "manageChildren",
      type: "boolean",
      example: `<foldable-blocks manage-children="true" id="exampleFoldableBlocks"></foldable-blocks>`
    },

    {
      name: "children-sizes",
      description: "Sets the sizes of the foldable blocks' children.",
      required: false,
      mappedInputAttribute: "childrenSizes",
      type: "string",
      example: `<foldable-blocks children-sizes="50% 50%" id="exampleFoldableBlocks"></foldable-blocks>`
    },

    {
      name: "children-flex-sizes",
      description: "Sets the flex values of the foldable blocks' children.",
      required: false,
      mappedInputAttribute: "childrenFlexValues",
      type: "string",
      example: `<foldable-blocks children-flex-sizes="1 2" id="exampleFoldableBlocks"></foldable-blocks>`
    },

    {
      name: "align-items",
      description: "Aligns the items of the foldable blocks.",
      required: false,
      mappedInputAttribute: "alignItems",
      type: "string",
      allowedValues: "start | end | center | stretch | baseline",
      transform: transformAlignItems,
      example: `<foldable-blocks align-items="center" id="exampleFoldableBlocks"></foldable-blocks>`
    },

    {
      name: "justify-contents",
      description: "Justifies the content of the foldable blocks.",
      required: false,
      mappedInputAttribute: "justifyContent",
      type: "string",
      allowedValues: "start | end | center | right | left | space-between | space-around | space-evenly",
      transform: transformJustifyContent,
      example: `<foldable-blocks justify-contents="space-between" id="exampleFoldableBlocks"></foldable-blocks>`
    },

    {
      name: "animation",
      description: "Disables or enables animation for the foldable blocks.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "disableAnimation",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<foldable-blocks animation="true" id="exampleFoldableBlocks"></foldable-blocks>`
    },

    {
      name: "close-others",
      description: "Determines whether other foldable blocks should be closed when one is opened.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "closeOthers",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<foldable-blocks close-others="true" id="exampleFoldableBlocks"></foldable-blocks>`
    },

    {
      name: "destroy-on-hide",
      description: "Determines whether the foldable blocks should be destroyed when hidden.",
      required: false,
      objectbinding: true,
      mappedInputAttribute: "destroyOnHide",
      type: "boolean",
      allowedValues: "true | false",
      validate: validateBoolean,
      example: `<foldable-blocks destroy-on-hide="true" id="exampleFoldableBlocks"></foldable-blocks>`
    },
  ], "foldable-blocks"),
  allowedChildren: ["foldable-block"],
  declarativeComponentTag: "ng-declarative-foldable-blocks",
};
