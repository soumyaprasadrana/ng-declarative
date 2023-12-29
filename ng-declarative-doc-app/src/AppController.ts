
export class AppController {

  appName = "ng-declarative-doc-app";

  subItems = [{
    label: "Test1"
  }]
  isCollapsed = false;
  constructor(private app: any) {

  }
  toogleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  onClickEvent(input: any, input2: any) {
    alert(input + input2);
    console.log(input);
  }
  copyInstallCmd() {
    this.app.copyToClipboard("npm i -g ng-declarative", () => {
      this.app.toast.showSuccess("Copied to clipboard.", 5000);
    }, () => {
      this.app.toast.showDanger("Failed to copy to the clipboard.", 5000);
    })
  }

  copyCmd(cmd: any) {
    console.log("Copy CMD invkoed :: ", cmd)
    this.app.copyToClipboard(cmd, () => {
      console.log("Copy CMD invkoed :: ", cmd + " :: Copied")
      this.app.toast.showSuccess("'" + cmd + "' copied to clipboard.", 5000);
    }, () => {
      console.log("Copy CMD invkoed :: ", cmd + " :: Failed")
    });
  }

}
