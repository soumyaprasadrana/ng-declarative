
export interface NgDeclarativeAuthController {

    user: any;
    userMeta: any;
    /**
    * Perform user login.
    * @param credentials User credentials (e.g., username and password).
    */
    login(credentials: { username: string; password: string }): any;
    /**
     * Perform user logout.
     */
    logout(): any;
    /**
     * Chcek if user is authenticated.
     */
    isAuthenticated(): any;

    /**
    * Lifecycle event when authentication fails.
    */
    onAuthenticationFailed(): any;

    /**
     * Chcek if user is Authorized.
     */
    isAutorized(): Promise<boolean>;

}