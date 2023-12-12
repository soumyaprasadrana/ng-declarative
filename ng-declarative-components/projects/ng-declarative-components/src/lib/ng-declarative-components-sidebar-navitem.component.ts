import { Component, ElementRef, Input } from '@angular/core';
import { Base } from './ng-declarative-components-base.component';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'ng-declarative-sidebar-navitem',
  template: `
   <li [ngStyle]="getComponentStyles()" [ngClass]="getcComponentClasses()" class="nav-item">
    @if(subItems){
      <a [href]="'#'+randomString"  data-bs-toggle="collapse" class="nav-link align-middle px-0" aria-current="page" >
      @if(icon){
        <i class="fs-4 bi-house"></i>
      }
      <span class="ms-1 d-none d-sm-inline">{{label}}</span>
      <ul class="collapse nav flex-column ms-1" [id]="randomString" data-bs-parent="#menu">
              @for(item of subItems;track item){
                @if(item.onClick){
                  <ng-declarative-sidebar-navitem [label]="item.label" [icon]="item.icon" [onClickEvent]="item.onClick" [onClickEventArgs]="item.onClickEventArgs?item.onClickEventArgs:[]" [subItems]="item.subItems?item.subItems:null"/>
                }@else if(item.route){
                   <ng-declarative-sidebar-navitem [route]="item.route" [label]="item.label" [icon]="item.icon" [onClickEvent]="item.onClick"  [subItems]="item.subItems?item.subItems:null"/>
                }@else{
                  <ng-declarative-sidebar-navitem [label]="item.label" [icon]="item.icon" [onClickEvent]="item.onClick"  [subItems]="item.subItems?item.subItems:null"/>
                }
                
              }
        </ul>
      </a>
    }@else{
      @if(route){
           <a  class="nav-link align-middle px-0" [routerLink]="[route]" aria-current="page" >
      @if(icon){
        <i class="fs-4 bi-house"></i>
      }
      <span class="ms-1 d-none d-sm-inline">{{label}}</span>
      </a>
      }@else{
      <a  class="nav-link align-middle px-0" (click)="sidebarOnClick()" aria-current="page" >
      @if(icon){
        <i class="fs-4 bi-house"></i>
      }
      <span class="ms-1 d-none d-sm-inline">{{label}}</span>
      </a>
    }
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
  @Input() route: string | undefined;
  @Input() label: string | undefined;
  @Input() icon: string | undefined;
  @Input() sidebarOnClick: any = () => { };
  @Input() subItems: any | undefined;
  randomString: string = '';

  override ngOnInit(): void {
    this.randomString = this.generateRandomString();
    console.log("=============== DEBUG sidebarOnClick >>>>>>>>>>>>>", this.sidebarOnClick);
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
