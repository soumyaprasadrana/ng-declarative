// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-03-25 18:26:41
 * @modify date 2022-04-19 18:26:41
 * @desc Toast Container
 */
import { Component, TemplateRef } from "@angular/core";

import { ToastService } from "./toast-service";

@Component({
  selector: "ng-declarative-toasts",
  template: `
    <ngb-toast style="box-shadow: 0 10px 20px rgb(0 0 0 / 40%), 0 4px 8px rgb(0 0 0 / 6%);border:none;"
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>
      <div class="row">
        <div class="col">
          <span>  <i class="bi" [ngClass]="{'bi-x-square-fill':toast.type=='danger','bi-check-square-fill':toast.type=='success','bi-exclamation-triangle-fill':toast.type=='warning'}"> </i></span><span class="pl-1 pr-2"> {{ toast.textOrTpl }}</span>
        
          </div>  
          <div class="col-sm-1" style="width:20px !important">
            <span class="ms-2" (click)="toastService.remove(toast)" style="cursor: pointer;position:relative;right:20px;margin:0;" > <i class="bi bi-x-square" aria-label="hidden"></i></span>
          </div>                
      </div>
      </ng-template>
    </ngb-toast>
  `,
  host: {
    class: "toast-container position-fixed top-3 end-0 p-3",
    style: "z-index: 1200",
  },
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {
    console.log("portal toast conatiner constructor called");
  }

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
