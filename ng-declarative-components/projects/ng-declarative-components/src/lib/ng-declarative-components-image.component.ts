// responsive-image.component.ts
import { Component, Input } from '@angular/core';
import { Base } from './ng-declarative-components-base.component';

@Component({
    selector: 'ng-declarative-image',
    template: `
    @if(type=="image"){
        <img [ngStyle]="getComponentStyles()" [ngClass]="getcComponentClasses()" [src]="imageUrl" [alt]="altText" [class.img-fluid]="isResponsive" />
    }@else if(type=="icon"){
        <i [ngStyle]="getComponentStyles()" [ngClass]="getcComponentClasses()" [class]="iconClass" ></i>
    }
  `,
    styles: [],
})
export class ImageComponent extends Base {
    @Input() imageUrl: string = '';
    @Input() iconClass: string = '';
    @Input() altText: string = '';
    @Input() type: string = "image";
    @Input() isResponsive: boolean = true;
}
