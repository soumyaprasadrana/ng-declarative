export class Utils {
    constructor(private app: any) {

    }
    handleClick(onClickEvent: any, onClickEventArgs: any) {
        if (onClickEvent) {
            if (typeof onClickEvent == "string") {
                if (onClickEvent.includes("appCtrl.")) {
                    // console.log(this.app.getAppController());
                    if (!onClickEventArgs)
                        this.app.getAppController()[onClickEvent.split(".")[1]]();
                    else {
                        if (Array.isArray(onClickEventArgs)) {
                            this.app.getAppController()[onClickEvent.split(".")[1]](...onClickEventArgs);
                        } else {
                            const argStrings = onClickEventArgs.split(/,(?![^{}]*})/);
                            console.log(argStrings);

                            // Map over the argument strings and parse them as JSON if they start with '{'
                            const args = argStrings.map((arg: string) => {
                                console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                                let res = arg.trim().startsWith("{")
                                    ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                                    : arg.trim();
                                return res;
                            });

                            // Now you have an array of arguments, including the parsed objects
                            console.log(args, this.app.getAppController());
                            this.app.getAppController()[onClickEvent.split(".")[1]](...args);
                        }
                    }
                }
                else if (onClickEvent.includes("routeCtrl.")) {
                    // console.log(this.app.getCurrentRoute().getController());
                    if (!onClickEventArgs)
                        this.app.getCurrentRoute().getController()[onClickEvent.split(".")[1]]();
                    else {
                        if (Array.isArray(onClickEventArgs)) {
                            this.app.getCurrentRoute().getController()[onClickEvent.split(".")[1]](...onClickEventArgs);
                        } else {
                            const argStrings = onClickEventArgs.split(/,(?![^{}]*})/);
                            console.log(argStrings);

                            // Map over the argument strings and parse them as JSON if they start with '{'
                            const args = argStrings.map((arg: string) => {
                                console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                                let res = arg.trim().startsWith("{")
                                    ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                                    : arg.trim();
                                return res;
                            });

                            // Now you have an array of arguments, including the parsed objects
                            console.log(args, this.app.getCurrentRoute().getController());
                            this.app.getCurrentRoute().getController()[onClickEvent.split(".")[1]](...args);
                        }
                    }
                }
                else if (onClickEvent.includes("app.")) {
                    const appS: any = this.app;
                    if (!onClickEventArgs) {
                        appS[onClickEvent.split(".")[1]]();
                    }

                    else {
                        if (Array.isArray(onClickEventArgs)) {
                            appS[onClickEvent.split(".")[1]](...onClickEventArgs);
                        } else {
                            const argStrings = onClickEventArgs.split(/,(?![^{}]*})/);
                            console.log(argStrings);

                            // Map over the argument strings and parse them as JSON if they start with '{'
                            const args = argStrings.map((arg: string) => {
                                console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                                let res = arg.trim().startsWith("{")
                                    ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                                    : arg.trim();
                                return res;
                            });

                            // Now you have an array of arguments, including the parsed objects
                            console.log(args, appS);
                            appS[onClickEvent.split(".")[1]](...args);
                        }
                    }

                }

            } else {

                if (!onClickEventArgs)
                    onClickEvent();
                else {
                    if (Array.isArray(onClickEventArgs)) {
                        onClickEvent(...onClickEventArgs);
                    } else {
                        const argStrings = onClickEventArgs.split(/,(?![^{}]*})/);
                        console.log(argStrings);

                        // Map over the argument strings and parse them as JSON if they start with '{'
                        const args = argStrings.map((arg: string) => {
                            console.log(arg, arg.replace(/'([^']*)'/g, '"$1"'));
                            let res = arg.trim().startsWith("{")
                                ? JSON.parse(arg.replace(/'([^']*)'/g, '"$1"'))
                                : arg.trim();
                            return res;
                        });

                        // Now you have an array of arguments, including the parsed objects
                        console.log(args, this.app.getAppController());
                        onClickEvent(...args);
                    }
                }
            }

        }
    }
}