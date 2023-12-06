import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";

@Component({
  selector: "ng-declarative-row",
  template: `
    <div 
    [ngClass]="getRowClasses()"
    [ngStyle]="getComponentStyles()"
    #rowRef
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`:host{
    display:contents;
  }`]
})
export class Row extends Base implements OnInit {
  @Input() rowCols: string | undefined;
  @Input() rowOrder: string | undefined;
  @Input() rowColsBreakpointXtraSmall: string | undefined;
  @Input() rowColsBreakpointSmall: string | undefined;
  @Input() rowColsBreakpointMedium: string | undefined;
  @Input() rowColsBreakpointLarge: string | undefined;
  @Input() rowColsBreakpointXtraLarge: string | undefined;
  @Input() alignItems: string | undefined;
  @Input() justifyContents: string | undefined;

  @ViewChild("rowRef") blockRef: ElementRef | undefined;

  constructor(elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService) {
    super(elementRef, animationService, app);

  }

  override ngAfterViewInit(): void {

    if (this.transition && this.blockRef) {
      this.animationService.animate(
        this.transition,
        this.blockRef.nativeElement,
        this.transitionDuration
      );
    }

  }

  getRowClasses(): string {
    let classes = this.getcComponentClasses();
    classes += ` row `;
    if (this.rowCols) classes += ` row-cols-${this.rowCols} `;
    if (this.rowColsBreakpointLarge) classes += ` row-cols-lg-${this.rowColsBreakpointLarge} `;
    if (this.rowColsBreakpointSmall) classes += ` row-cols-sm-${this.rowColsBreakpointSmall} `;
    if (this.rowColsBreakpointXtraLarge) classes += ` row-cols-xl-${this.rowColsBreakpointXtraLarge} `;
    if (this.rowColsBreakpointXtraSmall) classes += ` row-cols-xs-${this.rowColsBreakpointXtraSmall} `;
    if (this.rowColsBreakpointMedium) classes += ` row-cols-md-${this.rowColsBreakpointMedium} `;
    if (this.rowOrder) classes += ` order-${this.rowOrder} `
    if (this.alignItems) classes += ` align-items-${this.alignItems} `
    if (this.justifyContents) classes += ` justify-content-${this.justifyContents}`;
    return classes;
  }

}
