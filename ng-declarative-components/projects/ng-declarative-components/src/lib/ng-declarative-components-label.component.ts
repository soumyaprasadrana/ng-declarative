// declarative-label.component.ts
import { CommonModule } from "@angular/common";
import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";

@Component({
  selector: "ng-declarative-label",
  template: `
    <label [for]="for" [ngClass]="getLabelClasses()" [ngStyle]="getLabelStyles()">
    @if(theme=="callout"){
      <h4>{{ text}}</h4>
      {{calloutDesc}}
    }@else{
      {{ text }}
    }
    </label>
  `,
  styles: [`:host{
    display:contents;
  }`]
})
export class Label extends Base implements OnInit {
  @Input() text: string = "";
  @Input() fontSize: string | undefined;
  @Input() color: string | undefined;
  @Input() fontWeight: string = "normal";
  @Input() override height: string = "auto";
  @Input() override width: string = "auto";
  @Input() override customClass: string = "";
  @Input() for: string = "";
  @Input() theme: string = "";
  @Input() calloutDesc: string = "";

  constructor(elementRef: ElementRef,
     animationService: AnimationService,
     app: ApplicationService) {
      super(elementRef,animationService,app);
      console.log("=>Label == > DEBUG",this.app)

     }

  override ngOnInit() {}

  getLabelClasses(): string {
    // Apply Bootstrap classes along with custom class
    let classes = `label ${this.customClass}`;
    if (this.theme && this.theme != "") {
      switch (this.theme) {
        case "callout":
          classes += " callout callout-primary";
      }
    }
    return classes;
  }

  getLabelStyles(): { [key: string]: string } {
    let styles: any = this.getComponentStyles();
    if(this.fontSize) styles["font-size"] = this.fontSize;
    if(this.fontWeight) styles["font-weight"] = this.fontWeight;
    if (this.color) styles.color = this.color;
    console.log("==> DEBUG ==> Label ==> Styles",styles);
    return styles;
  }
}
