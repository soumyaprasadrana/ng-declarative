// responsive-image.component.ts
import { Component, Input } from '@angular/core';
import { Base } from './ng-declarative-components-base.component';

@Component({
    selector: 'ng-declarative-loader',
    template: `
  <div [ngClass]="getcComponentClasses()" [ngStyle]="getComponentStyles()" class="d-flex align-items-center justify-content-center w-100">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  `,
    styles: [
        `:host{
            display:contents;
        }`
    ],
})
export class LoaderComponent extends Base {

}
