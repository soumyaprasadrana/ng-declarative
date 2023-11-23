import {
  Input,
  OnInit,
  ElementRef,
  AfterViewInit,
  Directive,
  HostListener,
  Component,
} from "@angular/core";
import { AnimationService } from "./ng-declarative-animation.service";
import { ApplicationService } from "./ng-declarative-components.service";

@Component({
  template: ``,
})
export class Base implements OnInit, AfterViewInit {
  @Input() backgroundColor: string = "";
  @Input() border: string = "";
  @Input() borderColor: string = "";
  @Input() padding: string = "";
  @Input() margin: string = "";
  @Input() customClass: string = "";
  @Input() height: string | undefined;
  @Input() width: string | undefined;
  @Input() transition: string = ""; // Set the default transition to none
  @Input() transitionDuration: string = "0.5s"; // Set the default duration to 0.5s
  @Input() onClickEvent: any | undefined;
  @Input() onClickEventArgs: any | undefined;

  componentClasses: string = "";
  componentStyle: object = {};

  constructor(
    public elementRef: ElementRef,
    public animationService: AnimationService,
    public app: ApplicationService
  ) {}

  ngOnInit() {
    this.componentClasses = this.getcComponentClasses();
    this.componentStyle = this.getComponentStyles();
  }

  ngAfterViewInit() {}

  getcComponentClasses(): string {
    let classes = `${this.customClass}`;
    return classes;
  }

  @HostListener("click", [ "$event" ])
  onClickEventHandle($event: any) {
    console.log($event, this, this.onClickEvent);
    if (this.onClickEvent) {
      if (this.onClickEvent.includes("appCtrl")) {
        console.log(this.app.getAppController());
        if (!this.onClickEventArgs)
          this.app.getAppController()[this.onClickEvent.split(".")[1]]();
        else {
          const argStrings = this.onClickEventArgs.split(/,(?![^{}]*})/);
          console.log(argStrings);

          // Map over the argument strings and parse them as JSON if they start with '{'
          const args = argStrings.map((arg: string) => {
            console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
            let res = arg.trim().startsWith("{")
              ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
              : arg.trim();
            return res;
          });

          // Now you have an array of arguments, including the parsed objects
          console.log(args, this.app.getAppController());
          this.app.getAppController()[this.onClickEvent.split(".")[1]](...args);
        }
      }
    }
    $event.stopPropagation();
  }

  getComponentStyles(): { [key: string]: string } {
    let styles: any = {};
    if (this.backgroundColor) styles["background-color"] = this.backgroundColor;
    if (this.border) styles.border = this.border;
    if (this.borderColor) styles["border-color"] = this.borderColor;
    if (this.padding) styles.padding = this.padding;
    if (this.margin) styles.margin = this.margin;
    if (this.height) styles.height = this.height;
    if (this.width) styles.width = this.width;
    return styles;
  }
}
