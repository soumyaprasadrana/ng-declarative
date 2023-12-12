
export class AppController {

  appName = "ng-declarative-doc-app";
  showCopyMessage: boolean = false;
  copyMessage: string = 'sbjhbsdjh ashbhja';
  copyMessageType: string = '';
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
      this.showCopyMessage = true;
      this.copyMessage = "copied to clipboard.";
      this.copyMessageType = 'success';
      setTimeout(() => {
        this.showCopyMessage = false;
        this.copyMessage = '';
        this.copyMessageType = '';
      }, 1000);
    }, () => {
      this.showCopyMessage = true;
      this.copyMessage = "failed to copy to the clipboard.";
      this.copyMessageType = 'danger';
      setTimeout(() => {
        this.showCopyMessage = false;
        this.copyMessage = '';
        this.copyMessageType = '';
      }, 1000);
    })
  }
}
