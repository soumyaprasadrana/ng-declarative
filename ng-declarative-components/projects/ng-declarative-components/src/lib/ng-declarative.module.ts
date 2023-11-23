import { NgModule, ModuleWithProviders } from "@angular/core";
import { Application } from "./ng-declarative-components.component";
import { Link } from "./ng-declarative-components-link.component";
import { Block } from "./ng-declarative-components-block.component";
import { Label } from "./ng-declarative-components-label.component";
import { RouteComponent } from "./ng-declarative-components-route.component";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [ CommonModule, RouterModule ],
  providers: [ ApplicationService ],
  declarations: [ Application, Link, Block, Label, RouteComponent, Base ],
  exports: [ Application, Link, Block, Label, RouteComponent, Base ],
})
export class NgDeclarativeModule {}
