import { Component, Input } from '@angular/core';
import { Base } from './ng-declarative-components-base.component';

interface NavbarSlot {
    name: string;
    position: 'start' | 'end';
}

@Component({
    selector: 'ng-declarative-navbar',
    template: `

<nav [ngStyle]="getComponentStyles()" class="navbar navbar-expand-lg shadow-sm {{customClass}}" [ngClass]="{'navbar-light': colorScheme === 'light', 'navbar-dark': colorScheme === 'dark', 'fixed-top': fixedTop}">
  <!-- Brand -->
  <div class="container-fluid ms-2 me-2">
  <a class="navbar-brand " href="#">
    <p class="m-0" [ngClass]="brandTextCssClass">
    <ng-container *ngIf="brandImage">
      <img [src]="brandImage" alt="Brand Image" class="brand-icon me-2">
    </ng-container>
    <ng-container *ngIf="brandIcon">
        <i [class]="brandIcon+ ' me-2 brand-icon '"></i>
    </ng-container>
    @if(brandText){
        <strong>{{brandText}}</strong>
    }
    </p>
  </a>

  <!-- Toggler/collapsible Button -->
  <button
    class="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarNav">
     <ul class="navbar-nav">
         <ng-content select="[slotstart]"></ng-content>
     </ul>

     <ul class="navbar-nav ms-auto ">
        <ng-content select="[slotcenter]"></ng-content>
     </ul>

     <ul class="navbar-nav ms-auto ">
         <ng-content select="[slotend]"></ng-content>
     </ul>
</div>
  <!-- Navbar Items 
  <div class="collapse navbar-collapse" id="navbarNav">
    <div class="navbar-container w-100">
      <div class="navbar-start">
        <ng-content select="[slotstart]"></ng-content>
      </div>
      <div class="navbar-center">
        <ng-content select="[slotcenter]"></ng-content>
      </div>
      <div class="navbar-end">
        <ng-content select="[slotend]"></ng-content>
      </div>
    </div>
  </div>-->
</div>
</nav>


`,
    styles: [`
    /* Add this CSS in your component's style file or in the global styles */
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-start,
.navbar-center,
.navbar-end {
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-start > ng-declarative-block > div,
.navbar-center > ng-declarative-block > div,
.navbar-end > ng-declarative-block > div{
  gap: 10px !important;
}


.navbar-start {
  margin-right: auto; /* Pushes the content to the right */
}

.navbar-center {
  margin: 0 auto; /* Centers the content */
}

.navbar-end {
  margin-left: auto; /* Pushes the content to the left */
}

`]
})
export class NavbarComponent extends Base {
    @Input() brandText: string | undefined;
    @Input() brandTextCssClass: string | undefined;
    @Input() brandIcon: string | null = null;
    @Input() brandImage: string | null = null;
    @Input() colorScheme: 'light' | 'dark' = 'light';
    @Input() fixedTop: boolean = false;
    @Input() brandIconSize: number = 24; // Default size in pixels

    override ngOnInit(): void {
        console.log("=++++= DEBUG NavbarComponent ON INIT ", this.brandTextCssClass);
    }
}
