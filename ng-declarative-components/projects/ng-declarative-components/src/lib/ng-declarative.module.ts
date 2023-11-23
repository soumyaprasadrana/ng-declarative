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
import { LoopComponent } from "./ng-declarative-components-loop.component";
@NgModule({
  imports: [ CommonModule, RouterModule ],
  providers: [ ApplicationService ],
  declarations: [
    Application,
    Link,
    Block,
    Label,
    RouteComponent,
    Base,
    LoopComponent,
  ],
  exports: [
    Application,
    Link,
    Block,
    Label,
    RouteComponent,
    Base,
    LoopComponent,
  ],
})
export class NgDeclarativeModule {}
