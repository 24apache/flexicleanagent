import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { apiResponse } from "../utils/common.util";

const API_ENDPOINT = `${environment.apiUrl}/users`;

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private http: HttpClient) {}

    register(record: any): Observable<apiResponse> {
        return this.http
          .post<apiResponse>(`${API_ENDPOINT}`, record)
          .pipe(
            catchError((errorResponse: HttpErrorResponse) => {
              const customError: apiResponse = errorResponse.error;
              return throwError(customError);
            })
          );
    }
}
