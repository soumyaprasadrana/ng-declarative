import { Component, Input } from '@angular/core';
import { Base } from './ng-declarative-components-base.component';


@Component({
    selector: 'ng-declarative-sidebar',
    template: `
<div class="container-fluid">
    <div class="row flex-nowrap">
        <div [ngStyle]="getComponentStyles()" [ngClass]="getcComponentClasses()" class="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2  min-vh-100">
                <div class="d-flex align-items-center pb-3 mb-md-0 me-md-auto ">  
                     <ng-content select="[slotstart]"></ng-content>
                </div>
                <ul class="nav nav-pills sidebar-menu flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <ng-content select="[slotcenter]"></ng-content>
                </ul>
                <hr>
                <div class=" pb-4">
                  <ng-content select="[slotend]"></ng-content>
                </div>
            </div>
        </div>
        <div class="col py-3">
            <ng-content select="[slotcontent]"></ng-content>
        </div>
    </div>
</div>
`,
    styles: [`
   :host{
    display:contents;
   }
`]
})
export class SidebarComponent extends Base {

}
