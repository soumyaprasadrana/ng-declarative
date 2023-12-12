import { Component, ElementRef, Input } from '@angular/core';
import { Base } from './ng-declarative-components-base.component';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'ng-declarative-sidebar-navitem',
  template: `
   <li [ngStyle]="getComponentStyles()" [ngClass]="getcComponentClasses()" class="nav-item">
    @if(subItems){
      <a [href]="'#'+randomString" class="nav-link align-middle px-0" (click)="onClick()" aria-current="page" >
      @if(icon){
        <i class="fs-4 bi-house"></i>
      }
      <span class="ms-1 d-none d-sm-inline">{{label}}</span>
      <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
              @for(item of subItems;track item){
                <ng-declarative-sidebar-navitem [label]="item.label" [icon]="item.icon" [onClick]="item.onClick" [subItems]="item.subItems"/>
              }
        </ul>
      </a>
    }@else{
      <a  class="nav-link align-middle px-0" (click)="onClick()" aria-current="page" >
      @if(icon){
        <i class="fs-4 bi-house"></i>
      }
      <span class="ms-1 d-none d-sm-inline">{{label}}</span>
      </a>
    }
	    
	  </li>

`,
  styles: [`
  :host{
    display:contents;
  }
  
`]
})
export class SidebarNavbarItemComponent extends Base {

  @Input() label: string | undefined;
  @Input() icon: string | undefined;
  @Input() onClick: any = () => { };
  @Input() subItems: any | undefined;
  randomString: string = '';

  override ngOnInit(): void {
    this.randomString = this.generateRandomString();
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


}
