import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { apiResponse } from "../utils/common.util";

const API_ENDPOINT = `${environment.apiUrl}/master`;

@Injectable({
  providedIn: 'root',
})
export class CommonService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = [];

  // public fields
  isLoading$: Observable<boolean> | undefined;
  isLoadingSubject: BehaviorSubject<boolean> | undefined;


  constructor(private http: HttpClient) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  countries(): Observable<apiResponse> {
    return this.http.get<apiResponse>(`${API_ENDPOINT}/countries`).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const customError: apiResponse = errorResponse.error;
        return throwError(customError);
      })
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
