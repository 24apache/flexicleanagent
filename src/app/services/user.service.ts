import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subscription, catchError, finalize, map, of, switchMap, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthModel } from "../models/auth.model";
import { UserModel } from "../models/user.model";
import { apiResponse } from "../utils/common.util";
import { AuthHTTPService } from "./auth-http.service";

const API_ENDPOINT = `${environment.apiUrl}/users`;
export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = `${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserType> | undefined;
  isLoading$: Observable<boolean> | undefined;
  currentUserSubject: BehaviorSubject<UserType> | undefined;
  isLoadingSubject: BehaviorSubject<boolean> | undefined;

  get currentUserValue(): UserType {
    return this.currentUserSubject?.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject?.next(user);
  }

  constructor(private http: HttpClient, private router: Router, private authHttpService: AuthHTTPService,) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(email: string, password: string): Observable<UserType> {
    this.isLoadingSubject?.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject?.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.currentUserSubject?.next(undefined);
    this.router.navigate(['/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject?.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject?.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject?.next(false))
    );
  }

  register(record: any): Observable<apiResponse> {
    return this.http.post<apiResponse>(`${API_ENDPOINT}/register`, record).pipe(
      tap((authResInfo: any) => {
        const auth = new AuthModel();
        auth.authToken = authResInfo.data.accessToken;
        auth.refreshToken = authResInfo.data.accessToken;
        auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
        this.setAuthFromLocalStorage(auth);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        const customError: apiResponse = errorResponse.error;
        return throwError(customError);
      })
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject?.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject?.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
