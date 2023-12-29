import { NgDeclarativeAuthController } from "ng-declarative-components";
export class AuthController implements NgDeclarativeAuthController {
    user: any;
    userMeta: any;
    constructor(private app: any) {

    }
    login(credentials: { username: string; password: string; }): void {
        throw new Error("Method not implemented.");
    }
    logout(): void {
        throw new Error("Method not implemented.");
    }
    isAuthenticated(): boolean {
        if (this.user) {
            return true;
        } else {
            return true;
        }
    }
    isAutorized(): boolean {
        throw new Error("Method not implemented.");
    }

}