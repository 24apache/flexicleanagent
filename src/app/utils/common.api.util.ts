import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { getAuthToken } from "src/app/utils/auth.util";
import { apiResponse } from "src/app/utils/common.util";
import { environment } from "src/environments/environment";

import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import {
	ViewDateFormat,
	ViewTimezone,
} from '../modules/setting/models/settings.model';

const API_ENDPOINT = `${environment.apiUrl}`;

@Injectable({
	providedIn: 'root',
})
export class CommonService {
	headers: HttpHeaders;

	constructor(private http: HttpClient) {
		const authToken = getAuthToken();
		if (authToken) {
			this.headers = new HttpHeaders({
				Authorization: `Bearer ${authToken}`,
			});
		}
	}

	uploadFile(imageData: any): Observable<apiResponse> {
		return this.http
			.post<apiResponse>(`${API_ENDPOINT}/util/upload`, imageData, {
				headers: this.headers,
			})
			.pipe(
				catchError((errorResponse: HttpErrorResponse) => {
					const customError: apiResponse = errorResponse.error;
					return throwError(customError);
				})
			);
	}

	timezones(): Observable<ViewTimezone[]> {
		const url = `${API_ENDPOINT}/utils/timezones`;
		return this.http.get<any>(url).pipe(
			map((response) => {
				if (response.success && response.status === 200) {
					return response.data;
				} else {
					throw new Error('Failed to retrieve records.');
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				const customError: apiResponse = errorResponse.error;
				return throwError(customError);
			})
		);
	}

	dateFormats(): Observable<ViewDateFormat[]> {
		const url = `${API_ENDPOINT}/utils/date-formats`;
		return this.http.get<any>(url).pipe(
			map((response) => {
				if (response.success && response.status === 200) {
					return response.data;
				} else {
					throw new Error('Failed to retrieve records.');
				}
			}),
			catchError((errorResponse: HttpErrorResponse) => {
				const customError: apiResponse = errorResponse.error;
				return throwError(customError);
			})
		);
	}
}
