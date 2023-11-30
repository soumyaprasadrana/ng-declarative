import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  signals: any = {};
  routes: any = {};
  datasets: any = {};
  appController: any;
  currentRoute: any;
  constructor() {
    console.log("Application Service Initiated.");
  }
  addDataset(key: any, dataset: any) {
    this.datasets[key] = dataset;
  }
  setSignals(signals: any) {
    this.signals = signals;
  }
  setRoutes(routes: any) {
    this.routes = routes;
  }
  handleFrameworkError(err: any) {
    console.error(err);
  }
  getCurrentRoute() {
    console.log(this.currentRoute);
    return this.currentRoute;

  }
  setCurrentRoute(currentRoute: any) {
    this.currentRoute = currentRoute;
  }
  setAppController(appCtrl: any) {
    this.appController = appCtrl;
  }
  getAppController() {
    return this.appController;
  }
  getChild(component: any, child: any) {
    console.log(component, child);
  }
  getElementRef() {
    ``
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
