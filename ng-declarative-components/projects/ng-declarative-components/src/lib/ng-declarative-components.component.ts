import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicationService } from "./ng-declarative-components.service";
import { Router } from "@angular/router";

@Component({
  selector: "ng-declarative-app",
  template: `
   <div class="toast-container" >
        <ng-declarative-toasts aria-live="polite" aria-atomic="true" style="padding:0 !important"></ng-declarative-toasts>
    </div>

    <ng-content></ng-content>
  `,
  styleUrls: ["./styles.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class Application implements OnInit {
  @Input() name: string = "Declarative App";
  @Input() title: string = "ng Declarative";
  @Input() inputSignals: any | undefined;

  signals: any = {};

  constructor(private app: ApplicationService,
    private router: Router) {
    console.log("App Constructor");
    this.app.setRouter(this.router);
  }
  ngOnInit(): void {
    if (this.inputSignals) {
      for (var signalobj of this.inputSignals) {
        if (signalobj.type == "number")
          this.signals[signalobj.name] = signal<number>(Number(signalobj.value));
        if (signalobj.type == "string")
          this.signals[signalobj.name] = signal<string>(signalobj.value);
        if (signalobj.type == "boolean")
          this.signals[signalobj.name] = signal<boolean>(signalobj.value);
        if (signalobj.type == "json")
          this.signals[signalobj.name] = signal<object>(
            JSON.parse(signalobj.value)
          );
        if (signalobj.type == "any")
          this.signals[signalobj.name] = signal<any>(signalobj.value);
      }
    }
    this.app.setSignals(this.signals);
  }
}
