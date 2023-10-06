import { environment } from "src/environments/environment";
import { AuthModel } from "../models/auth.model";

export function getAuthToken(): string | null {
    try {
        const lsValue = localStorage.getItem(
            `${environment.appVersion}-${environment.USERDATA_KEY}`
        );
        if (!lsValue) {
            return null;
        }

        const authData: AuthModel = JSON.parse(lsValue);
        return authData?.authToken || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}
