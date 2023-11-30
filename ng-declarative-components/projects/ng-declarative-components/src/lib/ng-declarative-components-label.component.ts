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
    super(elementRef, animationService, app);

  }

  override ngOnInit() {
    console.log("===>> DEBUG LABEL TEXT =", this.text)

  }

  getLabelClasses(): string {
    // Apply Bootstrap classes along with custom class
    let classes = `label ${this.customClass}`;
    if (this.theme && this.theme != "") {
      switch (this.theme) {
        case "callout":
          classes = classes + " callout callout-primary ";
          break;
        case "heading-smallest":
          classes = classes + " h6 ";
          break;
        case "heading-small":
          classes = classes + " h5 ";
          break;
        case "heading-large":
          classes = classes + " h3 ";
          break;
        case "heading-larger":
          classes = classes + " h2 ";
          break;
        case "heading-largest":
          classes = classes + " h1 ";
          break;
        case "heading-normal":
          classes = classes + " h4 ";
          break;
        case "display-smallest":
          classes = classes + " display-6 ";
          break;
        case "display-small":
          classes = classes + " display-5 ";
          break;
        case "display-large":
          classes = classes + " display-3 ";
          break;
        case "display-larger":
          classes = classes + " display-2 ";
          break;
        case "display-largest":
          classes = classes + " display-1 ";
          break;
        case "display-normal":
          classes = classes + " display-4 ";
          break;
        case "lead":
          classes = classes + " lead ";
          break;
        case "mark":
          classes = classes + " mark ";
          break;
        case "small":
          classes = classes + " small ";
          break;
        case "underline":
          classes = classes + " text-decoration-underline ";
          break;
        case "linethrough":
          classes = classes + " text-decoration-line-through ";
          break;
      }
    }
    return classes;
  }

  getLabelStyles(): { [key: string]: string } {
    let styles: any = this.getComponentStyles();
    if (this.fontSize) styles["font-size"] = this.fontSize;
    if (this.fontWeight) styles["font-weight"] = this.fontWeight;
    if (this.color) styles.color = this.color;
    return styles;
  }
}
