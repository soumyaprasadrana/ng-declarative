import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  QueryList,
  ContentChildren,
  HostListener,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { AnimationService } from "./ng-declarative-animation.service";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { IntersectionObserverService } from "./ng-declarative-interaction.service";

@Component({
  selector: "ng-declarative-block",
  template: `
    <div
      [ngClass]="getBlockClasses()"
      [ngStyle]="getBlockStyles()"
      [class]="customClass"
      [style.height]="height"
      [style.width]="width"
      #blockRef
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`:host{
    display:contents;
  }`],
})
export class Block extends Base implements OnInit, AfterViewInit {
  @Input() gridColumns: string = "col-md-4";
  @Input() gridGap: string = "3";
  @Input() override backgroundColor: string | undefined;
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
  @Input() responsive: boolean = false;
  @Input() override transition: string = ""; // Set the default transition to none
  @Input() override transitionDuration: string = "0.5s"; // Set the default duration to 0.5s
  @Input() skipFlexClasses: boolean = false;

  blockClasses: string = "";
  blockStyle: object = {};

  responsiveClasses: string = '';
  @Input() viewportSM: "row" | "column" = "column";
  @Input() viewportMD: "row" | "column" = "row";
  @Input() viewportLG: "row" | "column" = "row";
  @Input() viewportXL: "row" | "column" = "row";
  @Input() viewportXXL: "row" | "column" = "row";

  @Output() blockRefChange: EventEmitter<Block> = new EventEmitter<Block>();

  //@ContentChildren('*') childBlocks: QueryList<ElementRef> | undefined;
  childBlocks!: any;

  @ViewChild("blockRef") blockRef: ElementRef | undefined;

  constructor(
    elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService,
    private _observer: IntersectionObserverService
  ) {
    super(elementRef, animationService, app);

  }

  override ngOnInit() {
    this.blockClasses = this.getBlockClasses();
    this.blockStyle = this.getBlockStyles();
    this.childBlocks = this.elementRef.nativeElement.childNodes[0].childNodes;
    /* if (this._observer.isSupported()) {
       this._observer.addTarget(this.elementRef.nativeElement, this.startAnimating);
     }*/
  }

  private startAnimating() {
    if (this.transition && this.blockRef) {
      this.animationService.animate(
        this.transition,
        this.blockRef.nativeElement,
        this.transitionDuration
      );
    }
  }
  override ngAfterViewInit() {
    // Emit the reference to the parent component
    this.blockRefChange.emit(this);

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
      this.childBlocks.forEach((child: any) => {
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
      this.childBlocks.forEach((child: any, index: number) => {
        const childElement = child;
        childElement.style.flex = flexValues[index] || "1";
      });
    }
  }

  setChildrenWidths() {
    if (this.childBlocks && this.childrenSizes) {
      const sizes = this.childrenSizes.split(",").map((size) => size.trim());
      this.childBlocks.forEach((child: any, index: number) => {
        const childElement = child.nativeElement;
        childElement.style.width = sizes[index] ? sizes[index] + "%" : "auto";
      });
    }
  }

  getBlockClasses(): string {
    let classes = `${this.skipFlexClasses ? " " : " d-flex "}  ${this.customClass}`;
    if (!this.backgroundColor && !this.backgroundImage && !this.background && !this.customClass)
      classes += ` bg-light `;
    if (!this.skipFlexClasses) {
      if (this.layoutDirection === "row-reverse") {
        classes += " flex-row-reverse ";
      } else if (this.layoutDirection === "column") {
        classes += " flex-column ";
      } else if (this.layoutDirection === "column-reverse") {
        classes += " flex-column-reverse ";
      }
    }
    if (this.responsive)
      classes += this.responsiveClasses;
    return classes;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    // Handle window resize
    if (this.responsive) {
      this.setResponsiveStyles();
    }
  }

  setResponsiveStyles() {

    var resClasses = '';
    var list = ["sm", "md", "lg", "xl", "xxl"];
    for (var viewport of list) {
      switch (viewport) {
        case "sm":
          resClasses += ` flex-sm-${this.viewportSM} `;
          break;
        case "md":
          resClasses += ` flex-md-${this.viewportMD} `;
          break;
        case "lg":
          resClasses += ` flex-lg-${this.viewportLG} `;
          break;
        case "xl":
          resClasses += ` flex-xl-${this.viewportXL} `;
          break;
        case "xxl":
          resClasses += ` flex-xxl-${this.viewportXXL} `;
          break;

      }
    }
    console.log("==== DEBUG SET RESPONSIVE BLOCK===", resClasses);
    setTimeout(() => this.responsiveClasses = resClasses + " flex-wrap ", 100);
  }

  getBlockStyles(): { [key: string]: string } {
    let styles: any = this.getComponentStyles();
    if (this.float) styles.float = this.float;
    if (this.justifyContent) styles["justify-content"] = this.justifyContent;
    if (this.alignItems) styles["align-items"] = this.alignItems;
    return styles;
  }
}
