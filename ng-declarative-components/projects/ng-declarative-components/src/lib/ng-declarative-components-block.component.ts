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

@Component({
  selector: "ng-declarative-block",
  template: `
    <div
      [ngClass]="blockClasses"
      [ngStyle]="blockStyle"
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
  @Input() responsive: boolean = true;
  @Input() override transition: string = ""; // Set the default transition to none
  @Input() override transitionDuration: string = "0.5s"; // Set the default duration to 0.5s
  @Input() skipFlexClasses: boolean = false;

  blockClasses: string = "";
  blockStyle: object = {};

  @Output() blockRefChange: EventEmitter<Block> = new EventEmitter<Block>();

  //@ContentChildren('*') childBlocks: QueryList<ElementRef> | undefined;
  childBlocks!: any;

  @ViewChild("blockRef") blockRef: ElementRef | undefined;

  constructor(
    elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService
  ) {
    super(elementRef, animationService, app);

  }

  override ngOnInit() {
    this.blockClasses = this.getBlockClasses();
    this.blockStyle = this.getBlockStyles();
    this.childBlocks = this.elementRef.nativeElement.childNodes[0].childNodes;
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
    if (!this.backgroundColor && !this.backgroundImage && !this.background)
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
    let styles: any = this.getComponentStyles();
    if (this.float) styles.float = this.float;
    if (this.justifyContent) styles["justify-content"] = this.justifyContent;
    if (this.alignItems) styles["align-items"] = this.alignItems;
    return styles;
  }
}
