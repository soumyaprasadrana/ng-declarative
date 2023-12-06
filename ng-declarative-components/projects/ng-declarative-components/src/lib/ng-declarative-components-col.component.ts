import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";

@Component({
  selector: "ng-declarative-col",
  template: `
    <div 
    [ngClass]="getColClasses()"
    [ngStyle]="getComponentStyles()"
    #colRef
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`:host{
    display:contents;
  }`]
})
export class Col extends Base implements OnInit {
  @Input() colSize: string | undefined;
  @Input() colOrder: string | undefined;
  @Input() breakpointXtraSmall: string | undefined;
  @Input() breakpointSmall: string | undefined;
  @Input() breakpointMedium: string | undefined;
  @Input() breakpointLarge: string | undefined;
  @Input() breakpointXtraLarge: string | undefined;
  @Input() alignSelf: string | undefined;

  @ViewChild("colRef") blockRef: ElementRef | undefined;

  colClasses: string = '';

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

  getColClasses(): string {
    let classes = this.getcComponentClasses();

    if (this.colSize) classes += ` col-${this.colSize} `;
    else classes += " col ";
    if (this.breakpointLarge) classes += ` col-lg-${this.breakpointLarge} `;
    if (this.breakpointSmall) classes += ` col-sm-${this.breakpointSmall} `;
    if (this.breakpointXtraLarge) classes += ` col-xl-${this.breakpointXtraLarge} `;
    if (this.breakpointXtraSmall) classes += ` col-xs-${this.breakpointXtraSmall} `;
    if (this.breakpointMedium) classes += ` col-md-${this.breakpointMedium} `;
    if (this.colOrder) classes += ` order-${this.colOrder} `;
    if (this.alignSelf) classes += ` align-self-${this.alignSelf} `;
    return classes;
  }

}
