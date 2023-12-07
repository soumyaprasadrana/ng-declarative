import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";

@Component({
  selector: "ng-declarative-label",
  template: `
    <label #labelRef [for]="for" [ngClass]="getLabelClasses()" [ngStyle]="getLabelStyles()">
    
    <ng-content></ng-content>
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
  @Input() override height: string = "max-content";
  @Input() override width: string = "max-content";
  @Input() override customClass: string = "";
  @Input() for: string = "";
  @Input() theme: string = "";
  @Input() calloutDesc: string = "";

  @ViewChild("labelRef") blockRef: ElementRef | undefined;

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

  getLabelClasses(): string {
    // Apply Bootstrap classes along with custom class
    let classes = `label ${this.customClass}`;
    if (this.theme && this.theme != "") {
      if (this.theme.includes(",")) {
        for (var item of this.theme.split(",")) {
          switch (item) {
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
            case "bold":
              classes = classes + " fw-bold ";
              break;
            case "bolder":
              classes = classes + " fw-bolder ";
              break;
            case "italic":
              classes = classes + " fst-italic ";
              break;
            case "light":
              classes = classes + " fw-light ";
              break;
            case "muted":
              classes = classes + " text-muted ";
              break;
            case "wrap":
              classes = classes + " text-wrap w-auto ";
              break;
            case "capitalize":
              classes = classes + " text-capitalize ";
              break;
            case "uppercase":
              classes = classes + " text-uppercase ";
              break;
            case "lowercase":
              classes = classes + " text-lowercase ";
              break;
          }
        }

      } else {
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
          case "bold":
            classes = classes + " fw-bold ";
            break;
          case "bolder":
            classes = classes + " fw-bolder ";
            break;
          case "italic":
            classes = classes + " fst-italic ";
            break;
          case "light":
            classes = classes + " fw-light ";
            break;
          case "muted":
            classes = classes + " text-muted ";
            break;
          case "wrap":
            classes = classes + " text-wrap w-auto ";
            break;
          case "capitalize":
            classes = classes + " text-capitalize ";
            break;
          case "uppercase":
            classes = classes + " text-uppercase ";
            break;
          case "lowercase":
            classes = classes + " text-lowercase ";
            break;
        }
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
