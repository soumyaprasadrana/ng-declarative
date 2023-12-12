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
import { InputComponent } from "./ng-declarative-components-input.component";
import { ButtonComponent } from "./ng-declarative-components-button.component";

@Component({
  selector: "ng-declarative-form",
  template: `
    <form
      [ngClass]="getBlockClasses()"
      [ngStyle]="getBlockStyles()"
      [class]="customClass"
      [style.height]="height"
      [style.width]="width"
      (onsubmit)="onSubmitHandle()"
      #blockRef
    >
      <ng-content></ng-content>
</form>
  `,
  styles: [`:host{
    display:contents;
  }`],
})
export class Form extends Base implements OnInit, AfterViewInit {
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
  @Input() layoutDirection: string = "row"; // 'row' for rows, 'column' for columns
  @Input() manageChildren: boolean = false;
  @Input() childrenSizes: string = "";
  @Input() childrenFlexValues: string = "";
  @Input() responsive: boolean = true;
  @Input() override transition: string = ""; // Set the default transition to none
  @Input() override transitionDuration: string = "0.5s"; // Set the default duration to 0.5s
  @Input() skipFlexClasses: boolean = false;
  @Input() dataset: string | undefined;
  @Input() formAction: any | undefined;


  blockClasses: string = "";
  blockStyle: object = {};

  @Output() formRefChange: EventEmitter<Form> = new EventEmitter<Form>();

  //@ContentChildren('*') childBlocks: QueryList<ElementRef> | undefined;
  childBlocks!: any;

  @ContentChildren(InputComponent, { descendants: true }) inputFields: QueryList<ElementRef> | undefined;

  @ContentChildren(ButtonComponent, { descendants: true }) actionButtons: QueryList<ElementRef> | undefined;

  @ViewChild("blockRef") blockRef: ElementRef | undefined;

  constructor(
    elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService
  ) {
    super(elementRef, animationService, app);

  }

  onSubmitHandle() {
    console.log("onSubmitHandle invoked");
  }

  override ngOnInit() {
    this.blockClasses = this.getBlockClasses();
    this.blockStyle = this.getBlockStyles();
    this.childBlocks = this.elementRef.nativeElement.childNodes[0].childNodes;
  }

  formValues() {
    let values: any = {};
    for (let item of this.inputFields ? this.inputFields.toArray() : []) {
      const instance: any = item;
      values[instance.getInputAttributeName()] = instance.getCurrentValue();
    }
    return values;
  }

  updateInputFieldsForSubmitted(submitted: boolean) {
    for (var item of this.inputFields ? this.inputFields.toArray() : []) {
      let instance: any = item;
      instance.updateSubmitted(submitted);
    }
  }

  checkIfFormIsValid() {
    for (var item of this.inputFields ? this.inputFields.toArray() : []) {
      let instance: any = item;
      if (!instance.isValid())
        return false;
    }
    return true;
  }
  override ngAfterViewInit() {
    // Emit the reference to the parent component
    this.formRefChange.emit(this);

    console.log("===>DEBUG ==> FORM", this.inputFields);

    console.log("===>DEBUG ==> FORM", this.actionButtons);

    for (let item of this.actionButtons ? this.actionButtons.toArray() : []) {
      console.log("===========> DEBUG FORM ACTION ::", item);
      let instance: any = item;
      console.log(item);
      const fun = () => {
        this.updateInputFieldsForSubmitted(true);
        if (this.checkIfFormIsValid())
          this.formAction(this.formValues());
      }
      instance.setOnClickEvent(fun);
    }

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
    let classes = `${this.skipFlexClasses ? "" : "d-flex"} gx-${this.gridGap} gy-${this.gridGap} ${this
      .gridColumns} ${this.customClass}`;

    if (!this.skipFlexClasses) {
      if (this.layoutDirection === "row-reverse") {
        classes += " flex-row-reverse";
      } else if (this.layoutDirection === "column") {
        classes += " flex-column";
      } else if (this.layoutDirection === "column-reverse") {
        classes += " flex-column-reverse";
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
