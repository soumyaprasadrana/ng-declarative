import { Component, ContentChild, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation, inject } from "@angular/core";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { AnimationService } from "./ng-declarative-animation.service";
import { ModalDismissReasons, NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "ng-declarative-dialog",
  providers: [NgbActiveModal],
  template: `
   
    <ng-template #dialogRef  let-dialog>
      <div [ngClass]="getDialogClasses()" [ngStyle]="getDialogStyles()">
      @if(!hideHeader){
      <div class="modal-header">
          @if(dialogTitle){
            <h4 class="modal-title dialog-title" id="modal-basic-title" [ngClass]="dialogTitleCssClass" >{{dialogTitle}}</h4>
          }
          <ng-content select="[dialogHeader]"></ng-content>
          @if(!hideCloseButton){
            <button type="button" class="btn-close" aria-label="Close" (click)="dialog.dismiss('Cross click')"></button>
          }
          
        </div>
      }@else if(hideHeader && dialogTitle) {
        <div class="modal-header">
          @if(dialogTitle){
            <h4 class="modal-title dialog-title" id="modal-basic-title" [ngClass]="dialogTitleCssClass" >{{dialogTitle}}</h4>
          }
          @if(!hideCloseButton){
            <button type="button" class="btn-close" aria-label="Close" (click)="dialog.dismiss('Cross click')"></button>
          }

        </div>
      }
       <div class="modal-body">
          <ng-content select="[dialogBody]"></ng-content>
        </div>
        @if(!hideFooter){
        <div class="modal-footer">
            <ng-content select="[dialogFooter]"></ng-content>
        </div>
        }
       <!-- #region -->
       
      </div>
      <button [id]="hiddenButtonId" style="display: none;" (click)="dialog.dismiss()">Close Button</button>

    </ng-template>

  `,
  styles: [`:host{
    display:contents;
  }`]
})
export class Dialog extends Base implements OnInit {

  @Input() dialogTitle: string | undefined;
  @Input() dialogTitleCssClass: string | undefined;
  @Input() hideCloseButton: boolean = false;
  @Input() theme: string = "";
  @Input() imageOverlay: boolean | undefined;

  // Modal Options
  /**
    * If `true`, modal opening and closing will be animated.
    */
  @Input() animation?: boolean;
  /**
   * `aria-labelledby` attribute value to set on the modal window.
   */
  @Input() ariaLabelledBy?: string;
  /**
   * `aria-describedby` attribute value to set on the modal window.
   */
  @Input() ariaDescribedBy?: string;
  /**
   * If `true`, the backdrop element will be created for a given modal.
   *
   * Alternatively, specify `'static'` for a backdrop which doesn't close the modal on click.
   *
   * Default value is `true`.
   */
  @Input() backdrop?: boolean | 'static' = 'static';
  /**
   * Callback right before the modal will be dismissed.
   *
   * If this function returns:
   * * `false`
   * * a promise resolved with `false`
   * * a promise that is rejected
   *
   * then the modal won't be dismissed.
   */
  @Input() beforeDismiss?: () => boolean | Promise<boolean>;
  /**
   * If `true`, the modal will be centered vertically.
   *
   * Default value is `false`.
   *
   * @since 1.1.0
   */
  @Input() centered?: boolean;
  /**
   * A selector specifying the element all new modal windows should be appended to.
   * Since v5.3.0 it is also possible to pass the reference to an `HTMLElement`.
   *
   * If not specified, will be `body`.
   */
  @Input() container?: string | HTMLElement;
  /**
   * If `true` modal will always be displayed in fullscreen mode.
   *
   * For values like `'md'` it means that modal will be displayed in fullscreen mode
   * only if the viewport width is below `'md'`. For custom strings (ex. when passing `'mysize'`)
   * it will add a `'modal-fullscreen-mysize-down'` class.
   *
   * If not specified will be `false`.
   */
  @Input() fullscreen?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | boolean | string;

  /**
   * If `true`, the modal will be closed when `Escape` key is pressed
   *
   * Default value is `true`.
   */
  @Input() keyboard?: boolean;
  /**
   * Scrollable modal content (false by default).
   *
   * @since 5.0.0
   */
  @Input() scrollable?: boolean;
  /**
   * Size of a new modal window.
   */
  @Input() size?: 'sm' | 'lg' | 'xl' | string;
  /**
   * A custom class to append to the modal window.
   */
  @Input() windowClass?: string;
  /**
   * A custom class to append to the modal dialog.
   *
   * @since 9.1.0
   */
  @Input() modalDialogClass?: string;
  /**
   * A custom class to append to the modal backdrop.
   *
   * @since 1.1.0
   */
  @Input() backdropClass?: string;


  hideHeader: boolean = false;
  hideFooter: boolean = false;

  @ViewChild("dialogRef") blockRef: ElementRef | undefined;
  @ContentChild('dialogHeader', { read: ElementRef }) headerContent: ElementRef | undefined;
  @ContentChild('dialogFooter', { read: ElementRef }) footerContent: ElementRef | undefined;

  hiddenButtonId: any = this.generateRandomString();

  closeResult: string = '';
  activeModal: any = inject(NgbActiveModal);
  constructor(elementRef: ElementRef,
    animationService: AnimationService,
    app: ApplicationService,
    private modalService: NgbModal,

  ) {
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

  private generateRandomString(): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

  getDialogClasses(): string {
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

  getDialogStyles(): { [key: string]: string } {
    let styles: any = this.getComponentStyles();
    return styles;
  }
  parseFullscreen(value: any) {
    return value == "true" ? true : value == "false" ? false : value;
  }
  open() {
    let modalOption: any = {};

    // Animation
    if (this.animation) {
      modalOption.animation = this.animation;
    }

    // Aria Labelled By
    if (this.ariaLabelledBy) {
      modalOption.ariaLabelledBy = this.ariaLabelledBy;
    }

    // Aria Described By
    if (this.ariaDescribedBy) {
      modalOption.ariaDescribedBy = this.ariaDescribedBy;
    }

    // Backdrop
    if (typeof this.backdrop !== 'undefined') {
      modalOption.backdrop = this.backdrop;
    }

    // Before Dismiss
    if (this.beforeDismiss) {
      modalOption.beforeDismiss = this.beforeDismiss;
    }

    // Centered
    if (typeof this.centered !== 'undefined') {
      modalOption.centered = this.centered;
    }

    // Container
    if (this.container) {
      modalOption.container = this.container;
    }

    // Fullscreen
    if (typeof this.fullscreen !== 'undefined') {
      modalOption.fullscreen = this.parseFullscreen(this.fullscreen);
    }

    // Keyboard
    if (typeof this.keyboard !== 'undefined') {
      modalOption.keyboard = this.keyboard;
    }

    // Scrollable
    if (typeof this.scrollable !== 'undefined') {
      modalOption.scrollable = this.scrollable;
    }

    // Size
    if (this.size) {
      modalOption.size = this.size;
    }

    // Window Class
    if (this.windowClass) {
      modalOption.windowClass = this.windowClass;
    }

    // Modal Dialog Class
    if (this.modalDialogClass) {
      modalOption.modalDialogClass = this.modalDialogClass;
    }

    // Backdrop Class
    if (this.backdropClass) {
      modalOption.backdropClass = this.backdropClass;
    }

    return this.modalService.open(this.blockRef, modalOption).result;
  }
  close(reason?: any) {
    if (document.getElementById(this.hiddenButtonId) != null)
      document.getElementById(this.hiddenButtonId)?.click();
  }
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
  setTheme(theme: any) {
    this.theme = theme;
  }
}
