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
  ViewEncapsulation,
} from "@angular/core";
import { AnimationService } from "./ng-declarative-animation.service";
import { ApplicationService } from "./ng-declarative-components.service";

@Component({
  selector: "ng-declarative-loop",
  template: `
  <ng-content></ng-content>
  
  `,
})
export class LoopComponent implements OnInit, AfterViewInit {
  @Input() item: any | undefined;

  @Output()
  loopRefChange: EventEmitter<LoopComponent> = new EventEmitter<
    LoopComponent
  >();

  @ContentChildren(LoopComponent)
  childBlocks: QueryList<LoopComponent> | undefined;

  constructor(
    elementRef: ElementRef,
    animationService: AnimationService,
    private app: ApplicationService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // Emit the reference to the parent component
  }
}
