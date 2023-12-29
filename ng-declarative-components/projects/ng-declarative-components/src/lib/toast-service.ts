// Copyright (c) 2022 soumya
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
/**
 * @author [soumya]
 * @email [soumyaprasad.rana@gmail.com]
 * @create date 2022-03-25 18:26:41
 * @modify date 2022-03-25 18:26:41
 * @desc Toast Service
 */
import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, type?: string, options?: any) {
    this.toasts.push({ type, textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
  showSuccess(templ: any, delay: any) {
    this.show(templ, 'success', { classname: 'bg-success text-light', delay: delay });
  }
  showDanger(templ: any, delay: any) {
    this.show(templ, 'danger', { classname: 'bg-danger text-light', delay: delay });
  }
  showWarning(templ: any, delay: any) {
    this.show(templ, 'warning', { classname: 'bg-warning text-light', delay: delay });
  }
}
