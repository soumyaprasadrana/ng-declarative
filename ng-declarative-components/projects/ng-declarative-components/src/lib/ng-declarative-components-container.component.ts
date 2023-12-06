import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";

@Component({
  selector: "ng-declarative-container",
  template: `
    <div 
    [ngClass]="getContainerClasses()"
    [ngStyle]="getComponentStyles()"
    #containerRef
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`:host{
    display:contents;
  }`]
})
export class Container extends Base implements OnInit {
  @Input() containerSize: string | undefined;

  @ViewChild("containerRef") blockRef: ElementRef | undefined;

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

  getContainerClasses(): string {
    let classes = this.getcComponentClasses();

    if (this.containerSize) {
      switch (this.containerSize) {
        case "small":
          classes += ` container-sm `;
          break;
        case "medium":
          classes += ` container-md `;
          break;
        case "large":
          classes += ` container-lg `;
          break;
        case "xtralarge":
          classes += ` container-xl `;
          break;
        case "xtraxtralarge":
          classes += ` container-xxl `;
          break;
        case "full":
          classes += ` container-fluid `;
          break;
      }

    }
    else classes += " container ";
    return classes;
  }

}
