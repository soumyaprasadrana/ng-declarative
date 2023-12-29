import { Injectable, signal } from "@angular/core";
import { HttpClientService } from "./ng-declarative-components.httpclient.service";
import { NavigationError } from "@angular/router";
import { ToastService } from "./toast-service";

@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  signals: any = {};
  routes: any = {};
  datasets: any = {};
  dataobjects: any = {};
  appController: any;
  authController: any;
  currentRoute: any;
  router: any;
  constructor(public client: HttpClientService,
    public toast: ToastService) {
    console.log("Application Service Initiated.");

  }
  setRouter(router: any) {
    this.router = router;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationError) {
        console.error('Navigation error:', event);
      }
    });
  }
  getRouter() {
    return this.router;
  }
  navigateTo(routes: any) {
    if (Array.isArray(routes)) {
      this.router.navigate(routes);
    } else {
      this.router.navigate([routes]);
    }
  }
  addDataset(key: any, dataset: any) {
    this.datasets[key] = dataset;
  }
  addDataobject(key: any, dataobject: any) {
    this.dataobjects[key] = dataobject;
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
    return this.currentRoute ? this.currentRoute : null;

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
  setAuthController(authCtrl: any) {
    this.authController = authCtrl;
  }
  getAuthController() {
    return this.authController;
  }

  getChild(childRef: any): any {
    if (this.getCurrentRoute().childComponents) {
      let filteredArray = this.getCurrentRoute().childComponents.filter((child: any) => {
        if (child._declarationTContainer) {
          console.log(child._declarationTContainer)
          return child._declarationTContainer.localNames[0] == childRef;
        }
        else {
          return child.elementRef.nativeElement.id == childRef;
        }
      });
      if (filteredArray.length > 0) {
        return filteredArray[0];
      }
      else {
        console.warn("Child component with ref :" + childRef + " not found!");
        return null;
      }
    } else {
      console.warn("Unable to load child components.");
      return null;
    }
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
  copyToClipboard(text: string, sucess: any, error: any): void {
    console.log("DEBUG >>>> text,success,error", text, sucess, error);
    navigator.clipboard.writeText(text).then(() => {
      // Success message
      if (sucess)
        sucess();
    }, () => {
      // Error message
      if (error)
        error();
    });
  }
  openDialog(dialogName: any) {

    if (this.getCurrentRoute().dialogs.length > 0) {
      let filteredDialogs = this.getCurrentRoute().dialogs.filter((dialog: any) => {
        return dialog.elementRef.nativeElement.id == dialogName;
      });
      if (filteredDialogs.length > 0) {
        return filteredDialogs[0].open();
      }
      else {
        console.warn("Requested dialog not found.")
      }
    } else {
      console.warn("No dialogs defined under this route.")
    }

  }
}
