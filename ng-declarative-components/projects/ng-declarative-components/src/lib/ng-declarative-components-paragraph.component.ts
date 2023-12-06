import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";

@Component({
  selector: "ng-declarative-paragraph",
  template: `
  @if(text){
    <p [ngClass]="getParagraphClasses()" [ngStyle]="getParagraphStyles()">
      {{ text }}
  </p>
  }@else if(template){
    <p [innerHTML]="template" [ngClass]="getParagraphClasses()" [ngStyle]="getParagraphStyles()">
  </p>
  }
    
  `,
  styles: [`:host{
    display:contents;
  }`]
})
export class Paragraph extends Base implements OnInit {
  @Input() text: string = "";
  @Input() fontSize: string | undefined;
  @Input() color: string | undefined;
  @Input() fontWeight: string = "normal";
  @Input() override height: string = "auto";
  @Input() override width: string = "auto";
  @Input() override customClass: string = "";
  @Input() theme: string = "";
  @Input() template: string | undefined;


  constructor(elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService) {
    super(elementRef, animationService, app);

  }

  override ngOnInit() { }

  getParagraphClasses(): string {
    // Apply Bootstrap classes along with custom class
    let classes = `p ${this.customClass}`;

    return classes;
  }

  getParagraphStyles(): { [key: string]: string } {
    let styles: any = this.getComponentStyles();
    if (this.fontSize) styles["font-size"] = this.fontSize;
    if (this.fontWeight) styles["font-weight"] = this.fontWeight;
    if (this.color) styles.color = this.color;
    return styles;
  }
}
