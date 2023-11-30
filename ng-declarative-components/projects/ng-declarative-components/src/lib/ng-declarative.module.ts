import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from "@angular/core";
import { Application } from "./ng-declarative-components.component";
import { Link } from "./ng-declarative-components-link.component";
import { Block } from "./ng-declarative-components-block.component";
import { Label } from "./ng-declarative-components-label.component";
import { RouteComponent } from "./ng-declarative-components-route.component";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { LoopComponent } from "./ng-declarative-components-loop.component";
import { FoldableBlocks } from "./ng-declarative-components-foldable-blocks.component";
import { NgbAccordionModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AnimationService } from "./ng-declarative-animation.service";
import { Paragraph } from "./ng-declarative-components-paragraph.component";
import { Alert } from "./ng-declarative-components-alert.component";
import { DataLoaderComponent } from "./ng-declarative-dataset.component";
import { HttpClientModule } from "@angular/common/http";
import { InputComponent } from "./ng-declarative-components-input.component";
import { FormsModule } from "@angular/forms";
import { Form } from "./ng-declarative-components-form.component";
import { ButtonComponent } from "./ng-declarative-components-button.component";
import { TableComponent } from "./ng-declarative-components-table.component";
@NgModule({
  imports: [CommonModule, RouterLink, NgbModule, HttpClientModule, FormsModule],
  declarations: [
    Application,
    Link,
    Block,
    Label,
    RouteComponent,
    Base,
    LoopComponent,
    FoldableBlocks,
    Paragraph,
    Alert,
    DataLoaderComponent,
    InputComponent,
    Form,
    ButtonComponent,
    TableComponent
  ],
  exports: [
    Application,
    Link,
    Block,
    Label,
    RouteComponent,
    Base,
    LoopComponent,
    FoldableBlocks,
    Paragraph,
    Alert,
    DataLoaderComponent,
    InputComponent,
    Form,
    ButtonComponent,
    TableComponent
  ],
})
export class NgDeclarativeModule {
  static forRoot(): ModuleWithProviders<NgDeclarativeModule> {
    return {
      ngModule: NgDeclarativeModule,
      providers: [ApplicationService, AnimationService],
    };
  }
}
