// ng-declarative-btn.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'ng-declarative-button',
  template: `
    <button
      [ngClass]="getButtonClasses()"
      [disabled]="isLoading || isSuccess || isError"
      (click)="handleButtonClick()"
      [type]="type"
    >
      {{label}}
      <div class="loader" *ngIf="isLoading"></div>
      <div class="icon" *ngIf="!isLoading && showIcon">
        <!-- Add your favorite icon here -->
        <i class="fas fa-star"></i>
      </div>
      <div class="status" *ngIf="isSuccess || isError">
        {{ isSuccess ? 'Success!' : 'Error!' }}
      </div>
    </button>
  `,
  styles: `

    /* ng-declarative-btn.component.css */

.ng-declarative-btn {
 border-radius: 0;
}

.ng-declarative-btn:hover {
 
}

.ng-declarative-btn:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.icon {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}

.status {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}

.success {
  background-color: #2ecc71;
  color: #fff;
  border-color: #2ecc71;
}

.error {
  background-color: #e74c3c;
  color: #fff;
  border-color: #e74c3c;
}

      
    `,
})
export class ButtonComponent {
  @Input() showIcon: boolean = true;
  @Input() isLoading: boolean = false;
  @Input() isSuccess: boolean = false;
  @Input() isError: boolean = false;
  @Input() theme: string = "primary";
  @Input() onclickEvent: any;
  @Input() type: string = "button";
  @Input() label: string | undefined;

  setSuccess(success: boolean) {
    this.isSuccess = success;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: boolean) {
    this.isError = error;
  }

  setOnClickEvent(event: any) {
    console.log("========= DEBUG SET ON CLICK EVENT==", event);
    this.onclickEvent = event;
  }

  handleButtonClick(): void {
    if (!this.isLoading) {
      // Add your button click logic here
      if (this.onclickEvent) {
        this.onclickEvent();
      }
    }
  }

  getButtonClasses(): string[] {
    const classes = ['ng-declarative-btn'];

    if (this.isLoading || this.isSuccess || this.isError) {
      return classes;
    }

    switch (this.theme) {
      case 'primary':
        classes.push('btn', 'btn-primary');
        break;
      case 'secondary':
        classes.push('btn', 'btn-secondary');
        break;
      case 'success':
        classes.push('btn', 'btn-success');
        break;
      case 'danger':
        classes.push('btn', 'btn-danger');
        break;
      case 'warning':
        classes.push('btn', 'btn-warning');
        break;
      case 'info':
        classes.push('btn', 'btn-info');
        break;
      case 'light':
        classes.push('btn', 'btn-light');
        break;
      case 'dark':
        classes.push('btn', 'btn-dark');
        break;
      case 'link':
        classes.push('btn', 'btn-link');
        break;
      case 'outline-primary':
        classes.push('btn', 'btn-outline-primary');
        break;
      case 'outline-secondary':
        classes.push('btn', 'btn-outline-secondary');
        break;
      case 'outline-success':
        classes.push('btn', 'btn-outline-success');
        break;
      case 'outline-danger':
        classes.push('btn', 'btn-outline-danger');
        break;
      case 'outline-warning':
        classes.push('btn', 'btn-outline-warning');
        break;
      case 'outline-info':
        classes.push('btn', 'btn-outline-info');
        break;
      case 'outline-light':
        classes.push('btn', 'btn-outline-light');
        break;
      case 'outline-dark':
        classes.push('btn', 'btn-outline-dark');
        break;
      default:
        break;
    }

    return classes;
  }

}
