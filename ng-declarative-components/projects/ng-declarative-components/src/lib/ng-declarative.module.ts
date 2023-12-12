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
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
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
import { ImageComponent } from "./ng-declarative-components-image.component";
import { SlideshowComponent } from "./ng-declarative-components-slideshow.component";
import { NavbarComponent } from "./ng-declarative-components-navbar.component";
import { NavbarItemComponent } from "./ng-declarative-components-navitem.component";
import { HttpClientService } from "./ng-declarative-components.httpclient.service";
import { Container } from "./ng-declarative-components-container.component";
import { Row } from "./ng-declarative-components-row.component copy";
import { Col } from "./ng-declarative-components-col.component";
import { LoaderComponent } from "./ng-declarative-components-loader.component";
import { Card } from "./ng-declarative-components-card.component";
import { SidebarComponent } from "./ng-declarative-components-sidebar.component";
import { SidebarNavbarItemComponent } from "./ng-declarative-components-sidebar-navitem.component";
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
    TableComponent,
    ImageComponent,
    SlideshowComponent,
    NavbarComponent,
    NavbarItemComponent,
    Container,
    Row,
    Col,
    LoaderComponent,
    Card,
    SidebarComponent,
    SidebarNavbarItemComponent
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
    TableComponent,
    ImageComponent,
    SlideshowComponent,
    NavbarComponent,
    NavbarItemComponent,
    Container,
    Row,
    Col,
    LoaderComponent,
    Card,
    SidebarComponent,
    SidebarNavbarItemComponent
  ],
})
export class NgDeclarativeModule {
  static forRoot(): ModuleWithProviders<NgDeclarativeModule> {
    return {
      ngModule: NgDeclarativeModule,
      providers: [ApplicationService, AnimationService, HttpClientService],
    };
  }
}
