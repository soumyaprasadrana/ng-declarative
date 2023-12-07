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
  template: `
  `,
})
export class Base implements OnInit, AfterViewInit {
  @Input() background: string | undefined;
  @Input() backgroundColor: string | undefined;
  @Input() backgroundImage: string | undefined;
  @Input() backgroundSize: string = "cover";
  @Input() backgroundPosition: string = "center";
  @Input() backgroundRepeate: string = "no-repeat";
  @Input() border: string = "";
  @Input() borderStart: string | undefined;
  @Input() borderEnd: string | undefined;
  @Input() borderTop: string | undefined;
  @Input() borderBottom: string | undefined;
  @Input() borderColor: string = "";
  @Input() padding: string = "";
  @Input() margin: string | undefined;
  @Input() customClass: string = "";
  @Input() height: string | undefined;
  @Input() width: string | undefined;
  @Input() transition: string = ""; // Set the default transition to none
  @Input() transitionDuration: string = "0.5s"; // Set the default duration to 0.5s
  @Input() onClickEvent: any | undefined;
  @Input() onClickEventArgs: any | undefined;
  @Input() paddingStart: any;
  @Input() paddingEnd: any;
  @Input() paddingTop: any;
  @Input() paddingBottom: any;
  @Input() marginStart: any;
  @Input() marginTop: any;
  @Input() marginBottom: any;
  @Input() marginEnd: any;
  @Input() overflow: any;

  componentClasses: string = "";
  componentStyle: object = {};

  componentLoading: boolean = false;


  constructor(
    public elementRef: ElementRef,
    public animationService: AnimationService,
    public app: ApplicationService
  ) { }

  ngOnInit() {
    this.componentClasses = this.getcComponentClasses();
    this.componentStyle = this.getComponentStyles();
  }

  ngAfterViewInit() {

    if (this.transition && this.elementRef) {
      this.animationService.animate(
        this.transition,
        this.elementRef
          .nativeElement,
        this.transitionDuration
      );
    }

  }

  getcComponentClasses(): string {
    let classes = `${this.customClass}`;
    return classes;
  }

  @HostListener("click", ["$event"])
  onClickEventHandle($event: any) {
    if (this.onClickEvent) {
      if (typeof this.onClickEvent == "string") {
        if (this.onClickEvent.includes("appCtrl.")) {
          // console.log(this.app.getAppController());
          if (!this.onClickEventArgs)
            this.app.getAppController()[this.onClickEvent.split(".")[1]]();
          else {
            if (Array.isArray(this.onClickEventArgs)) {
              this.app.getAppController()[this.onClickEvent.split(".")[1]](...this.onClickEventArgs);
            } else {
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
        else if (this.onClickEvent.includes("routeCtrl.")) {
          // console.log(this.app.getCurrentRoute().getController());
          if (!this.onClickEventArgs)
            this.app.getCurrentRoute().getController()[this.onClickEvent.split(".")[1]]();
          else {
            if (Array.isArray(this.onClickEventArgs)) {
              this.app.getCurrentRoute().getController()[this.onClickEvent.split(".")[1]](...this.onClickEventArgs);
            } else {
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
              console.log(args, this.app.getCurrentRoute().getController());
              this.app.getCurrentRoute().getController()[this.onClickEvent.split(".")[1]](...args);
            }
          }
        }
        else if (this.onClickEvent.includes("app.")) {
          const appS: any = this.app;
          if (!this.onClickEventArgs) {
            appS[this.onClickEvent.split(".")[1]]();
          }

          else {
            if (Array.isArray(this.onClickEventArgs)) {
              appS[this.onClickEvent.split(".")[1]](...this.onClickEventArgs);
            } else {
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
              console.log(args, appS);
              appS[this.onClickEvent.split(".")[1]](...args);
            }
          }

        }

      } else {

        if (!this.onClickEventArgs)
          this.onClickEvent();
        else {
          if (Array.isArray(this.onClickEventArgs)) {
            this.onClickEvent(...this.onClickEventArgs);
          } else {
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
            this.onClickEvent(...args);
          }
        }
      }

    }
    $event.stopPropagation();
  }

  getComponentStyles(): { [key: string]: string } {
    let styles: any = {};
    if (this.backgroundColor && !this.backgroundImage && !this.background) styles["background-color"] = this.backgroundColor;
    if (this.background) styles["background"] = this.background;
    if (this.backgroundImage && !this.background) styles["background-image"] = this.backgroundImage;
    if (this.backgroundPosition) styles["background-position"] = this.backgroundPosition;
    if (this.backgroundSize) styles["background-size"] = this.backgroundSize;
    if (this.backgroundRepeate) styles["background-repeat"] = this.backgroundRepeate;
    if (this.border) styles.border = this.border;
    if (this.borderStart) styles["border-left"] = this.borderStart;
    if (this.borderEnd) styles["border-right"] = this.borderEnd;
    if (this.borderTop) styles["border-top"] = this.borderTop;
    if (this.borderBottom) styles["border-bottom"] = this.borderBottom;
    if (this.borderColor) styles["border-color"] = this.borderColor;
    if (this.padding) styles.padding = this.padding;
    if (this.paddingStart) styles["padding-left"] = this.paddingStart;
    if (this.paddingEnd) styles["padding-right"] = this.paddingEnd;
    if (this.paddingTop) styles["padding-top"] = this.paddingTop;
    if (this.paddingBottom) styles["padding-bottom"] = this.paddingBottom;
    if (this.margin) styles.margin = this.margin;
    if (this.marginStart) styles["margin-left"] = this.marginStart;
    if (this.marginTop) styles["margin-top"] = this.marginTop;
    if (this.marginBottom) styles["margin-bottom"] = this.marginBottom;
    if (this.marginEnd) styles["margin-right"] = this.marginEnd;
    if (this.height) styles.height = this.height;
    if (this.width) styles.width = this.width;
    if (this.overflow) styles.overflow = this.overflow;
    return styles;
  }
}
