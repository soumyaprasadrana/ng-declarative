import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";

@Component({
  selector: "ng-declarative-alert",
  template: `
    <ngb-alert [type]="type" [dismissible]="dismiss" [ngClass]="getAlertClasses()" [ngStyle]="getAlertStyles()">
      <p style="margin-bottom:0" [innerHtml]="text"></p>
    </ngb-alert>
  `,
  styles: [`:host{
    display:contents;
  }`]
})
export class Alert extends Base implements OnInit {
  @Input() text: string = "";
  @Input() fontSize: string | undefined;
  @Input() color: string | undefined;
  @Input() fontWeight: string = "normal";
  @Input() override height: string = "auto";
  @Input() override width: string = "auto";
  @Input() override customClass: string = "";
  @Input() theme: string = "";
  @Input() dismiss: boolean = false;
  @Input() type: string = "primary";


  constructor(elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService) {
    super(elementRef, animationService, app);

  }

  override ngOnInit() { }

  getAlertClasses(): string {
    // Apply Bootstrap classes along with custom class
    let classes = `p ${this.customClass}`;

    return classes;
  }

  getAlertStyles(): { [key: string]: string } {
    let styles: any = this.getComponentStyles();
    if (this.fontSize) styles["font-size"] = this.fontSize;
    if (this.fontWeight) styles["font-weight"] = this.fontWeight;
    if (this.color) styles.color = this.color;
    return styles;
  }
}
