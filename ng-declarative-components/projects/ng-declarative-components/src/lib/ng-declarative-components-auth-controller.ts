import { Observable } from "rxjs";

export interface AuthController {
    /**
     * Perform user login.
     * @param credentials User credentials (e.g., username and password).
     * @returns Observable indicating the success of the login operation.
     */
    login(credentials: { username: string; password: string }): Observable<boolean>;

    /**
     * Perform user logout.
     * @returns Observable indicating the success of the logout operation.
     */
    logout(): Observable<boolean>;

    /**
     * Check if the user is authenticated.
     * @returns Observable indicating whether the user is authenticated.
     */
    isAuthenticated(): Observable<boolean>;
}