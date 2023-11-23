import { CommonModule } from "@angular/common";
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";
import { RouterLink } from "@angular/router";
import { Label } from "./ng-declarative-components-label.component";
import { ApplicationService } from "./ng-declarative-components.service";

@Component({
  selector: "ng-declarative-link",
  template: `
  @if(href){
    <a [href]="href" [ngClass]="getLinkClasses()" [ngStyle]="getLinkStyles()">
      @if(label){
       <!-- <ng-declarative-label [text]="label"/> -->
       {{label}}
      }
      
      <ng-content></ng-content>
    </a>
  }@else if (routerLinkObject) {
    <a [routerLink]="routerLinkObject" [ngClass]="getLinkClasses()" [ngStyle]="getLinkStyles()">
     @if(label){
        <!--<ng-declarative-label [text]="label"/> -->
        {{label}}
      }
      
      <ng-content></ng-content>
    </a>
  }
  `,
  styles:[`:host{
    display:contents;
  }`]
})
export class Link extends Base implements OnInit {
  @Input() href: string | undefined;
  @Input() target: string = "_self";
  @Input() label: string | undefined;
  @Input() routerLinkObject: any | undefined;
  @Input() navigateParams: string | undefined;
  @Input() theme: string | undefined;

  constructor(elementRef: ElementRef, animationService: AnimationService,app:ApplicationService) {
    super(elementRef, animationService,app);
    console.log("=>Link == > DEBUG",this.app)
  }
  override ngOnInit() {}

  getLinkClasses(){
    let classes = this.getcComponentClasses();
    // Add additional classes as needed
    if (this.theme) {
      switch (this.theme) {
        case "link":
          classes += " link-dark ";
          break;
        case "link-primary":
          classes += " link-primary ";
          break;
        case "link-success":
          classes += " link-success ";
          break;
        case "link-warning":
          classes += " link-warning ";
          break;
        case "link-danger":
          classes += " link-danger ";
          break;
        case "light-light":
          classes += " link-light ";
          break;
        case "link-danger":
          classes += " link-danger ";
          break;
        case "link-dark":
          classes += " link-dark ";
          break;
        case "link-danger":
          classes += " link-success ";
          break;
        default:
          classes += " link-dark ";
      }
    }
    return classes;
  }

  getLinkStyles(): { [key: string]: string } {
    let styles = this.getComponentStyles();
    // Add additional styles as needed
    return styles;
  }
}

