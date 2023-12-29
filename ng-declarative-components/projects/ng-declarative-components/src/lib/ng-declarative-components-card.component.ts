import { Component, ContentChild, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";

@Component({
  selector: "ng-declarative-card",
  template: `
   
    <div #cardRef [ngClass]="getCardClasses()" [ngStyle]="getCardStyles()">\
      @if(!hideHeader){
      <div class="card-header">
          <ng-content select="[cardheader]"></ng-content>
        </div>
      }
        <div class="image-section {{imageClass}} {{iconClass}}">
        @if(imageTop){
          <img [ngClass]="imageTopCss" [src]="imageTop" class="card-img-top" alt="card-img-top">
        }
         @if(iconTop){
          <i [ngClass]="iconTop" alt="card-icon-top"></i>
        }
        </div>
        <div class="card-body" [ngClass]="{'card-img-overlay':imageOverlay}">
        @if(cardTitle){
          <h2 class="card-title" [ngClass]="cardTitleCssClass">{{cardTitle}}</h2>
        }
        @if(cardSubTitle){
          <h5 class="card-subtitle mb-2 text-muted" [ngClass]="cardSubTitleCssClass">{{cardSubTitle}}</h5>
        }
        <ng-content select="[cardbody]"></ng-content>

        </div>
        @if(!hideFooter){
        <div class="card-footer">
            <ng-content select="[cardfooter]"></ng-content>
        </div>
        }
        @if(imageBottom){
          <img [ngClass]="imageBottomCss" [src]="imageBottom" class="card-img-bottom" alt="card-img-bottom">
        }
        
</div>

  `,
  styles: [`:host{
    display:contents;
  }`]
})
export class Card extends Base implements OnInit {
  @Input() imageTop: string | undefined;
  @Input() iconTop: string | undefined;
  @Input() imageClass: string | undefined;
  @Input() iconClass: string | undefined;
  @Input() imageTopCss: string | undefined;
  @Input() imageBottom: string | undefined;
  @Input() imageBottomCss: string | undefined;
  @Input() cardTitle: string | undefined;
  @Input() cardTitleCssClass: string | undefined;
  @Input() cardSubTitle: string | undefined;
  @Input() cardSubTitleCssClass: string | undefined;
  @Input() theme: string = "";
  @Input() imageOverlay: boolean | undefined;

  hideHeader: boolean = false;
  hideFooter: boolean = false;

  @ViewChild("cardRef") blockRef: ElementRef | undefined;
  @ContentChild('cardHeader', { read: ElementRef }) headerContent: ElementRef | undefined;
  @ContentChild('cardFooter', { read: ElementRef }) footerContent: ElementRef | undefined;

  constructor(elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService) {
    super(elementRef, animationService, app);

  }
  override ngAfterViewInit(): void {
    if (!this.headerContent)
      this.hideHeader = true;
    if (!this.footerContent)
      this.hideFooter = true;
    if (this.transition && this.blockRef) {
      this.animationService.animate(
        this.transition,
        this.blockRef.nativeElement,
        this.transitionDuration
      );
    }

  }



  getCardClasses(): string {
    // Apply Bootstrap classes along with custom class
    let classes = `card ${this.customClass}`;
    if (this.theme && this.theme != "") {
      let list: any = [];
      if (this.theme.includes(",")) {
        list = this.theme.split(",");
      } else {
        list.push(this.theme);
      }
      for (var item of list) {
        switch (item) {
          case "primary":
            classes = classes + " text-white bg-primary ";
            break;
          case "secondary":
            classes = classes + " text-white bg-secondary ";
            break;
          case "success":
            classes = classes + " text-white bg-success ";
            break;
          case "warning":
            classes = classes + " text-dark bg-warning ";
            break;
          case "info":
            classes = classes + " text-dark bg-info ";
            break;
          case "light":
            classes = classes + " text-dark bg-light ";
            break;
          case "dark":
            classes = classes + " text-white bg-dark ";
            break;
          case "danger":
            classes = classes + " text-white bg-danger ";
            break;
          case "border-primary":
            classes = classes + " border-primary ";
            break;
          case "border-secondary":
            classes = classes + " border-secondary ";
            break;
          case "border-success":
            classes = classes + " border-success ";
            break;
          case "border-warning":
            classes = classes + " border-warning ";
            break;
          case "border-info":
            classes = classes + " border-info ";
            break;
          case "border-light":
            classes = classes + " border-light ";
            break;
          case "border-dark":
            classes = classes + " border-dark ";
            break;


        }
      }

    }
    return classes;
  }

  getCardStyles(): { [key: string]: string } {
    let styles: any = this.getComponentStyles();
    return styles;
  }
}
