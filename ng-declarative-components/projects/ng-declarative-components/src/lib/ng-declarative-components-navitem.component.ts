import { Component, ElementRef, Input } from '@angular/core';
import { Base } from './ng-declarative-components-base.component';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'ng-declarative-navitem',
  template: `
   <li [ngStyle]="getComponentStyles()" [ngClass]="getcComponentClasses()" class="nav-item">
	    <a class="nav-link mx-2 text-uppercase" [ngClass]="{'active':isActive}" aria-current="page" [routerLink]="[route]">{{label}}</a>
	  </li>

`,
  styles: [`
  :host{
    display:contents;
  }
  .nav-link{
     font-size:14px;
	   font-weight:700
  }
`]
})
export class NavbarItemComponent extends Base {
  @Input() route: string | undefined;
  @Input() label: string | undefined;
  isActive: boolean = false;
  router: any;


  override ngOnInit(): void {
    this.router = this.app.getRouter();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe((event: any) => {
      const urlAfterRedirects = event.urlAfterRedirects;
      if (urlAfterRedirects.includes(this.route)) {
        this.isActive = true;
      }
      else {
        this.isActive = false;
      }

    });
  }

}
