import { CommonModule } from "@angular/common";
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  QueryList,
  ContentChildren,
  HostListener,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { AnimationService } from "./ng-declarative-animation.service";
import { ApplicationService } from "./ng-declarative-components.service";
import { Base } from "./ng-declarative-components-base.component";

@Component({
  selector: "ng-declarative-route",
  template: `
      <ng-content></ng-content>
  `,
  styleUrls: ["./styles.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RouteComponent implements OnInit, AfterViewInit {
  @Input() uri: string = "/";
  @Input() title: string | undefined;

  @Output()
  blockRefChange: EventEmitter<RouteComponent> = new EventEmitter<
    RouteComponent
  >();

  @ContentChildren(RouteComponent)
  childBlocks: QueryList<RouteComponent> | undefined;

  constructor(
    elementRef: ElementRef,
    animationService: AnimationService,
    private app: ApplicationService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    // Emit the reference to the parent component
    this.blockRefChange.emit(this);
  }
}
