export class AuthModel {
    authToken: string | undefined;
    refreshToken: string | undefined;
    expiresIn: Date | undefined;

    setAuth(auth: AuthModel) {
        this.authToken = auth.authToken;
        this.refreshToken = auth.refreshToken;
        this.expiresIn = auth.expiresIn;
    }
}
