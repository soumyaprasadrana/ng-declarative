import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  signals: any = {};
  routes: any = {};
  appController: any;
  constructor() {}
  setSignals(signals: any) {
    console.log("==DEBUG", signals);
    this.signals = signals;
  }
  setRoutes(routes: any) {
    this.routes = routes;
  }
  setAppController(appCtrl: any) {
    this.appController = appCtrl;
  }
  getAppController() {
    return this.appController;
  }
  createAppSignal(signalMetaData: any) {
    if (!signalMetaData.name || !signalMetaData.type) {
      console.error(
        "Failed to create a application level signal; missing metadata;"
      );
      return null;
    }
    if (signalMetaData.type == "number")
      this.signals[signalMetaData.name] = signal<number>(signalMetaData.value);
    if (signalMetaData.type == "string")
      this.signals[signalMetaData.name] = signal<string>(signalMetaData.value);
    if (signalMetaData.type == "json")
      this.signals[signalMetaData.name] = signal<object>(
        JSON.parse(signalMetaData.value)
      );
    if (signalMetaData.type == "any")
      this.signals[signalMetaData.name] = signal<any>(signalMetaData.value);
    return this.signals[signalMetaData.name];
  }
}
