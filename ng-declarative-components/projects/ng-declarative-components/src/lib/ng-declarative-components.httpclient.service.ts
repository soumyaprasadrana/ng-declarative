import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpClientService {
  constructor(private http: HttpClient) { }

  post(
    url: string,
    body: any | null,
    options?: RequestOptions
  ): Observable<any> {
    return this.http
      .post(url, body, this.createHttpOptions(options))
      .pipe(catchError(this.handleError));
  }

  get(url: string, options?: RequestOptions): Observable<any> {
    return this.http
      .get(url, this.createHttpOptions(options))
      .pipe(catchError(this.handleError));
  }

  put(
    url: string,
    body: any | null,
    options?: RequestOptions
  ): Observable<any> {
    return this.http
      .put(url, body, this.createHttpOptions(options))
      .pipe(catchError(this.handleError));
  }

  delete(url: string, options?: RequestOptions): Observable<any> {
    return this.http
      .delete(url, this.createHttpOptions(options))
      .pipe(catchError(this.handleError));
  }

  private createHttpOptions(options?: RequestOptions): any {
    const headers = new HttpHeaders(options?.headers || {});
    let params = new HttpParams({ fromObject: options?.params || {} });

    // Add additional query parameters if provided
    if (options?.queryParams) {
      params = params.appendAll(options.queryParams);
    }

    return {
      headers,
      params,
      // You can add more options here if needed
    };
  }

  private handleError(error: any): Observable<never> {
    // Implement your custom error handling logic here
    console.error("An error occurred:", error);
    return throwError(error);
  }
}

export interface RequestOptions {
  headers?: { [key: string]: string };
  params?: { [key: string]: string | number };
  queryParams?: { [key: string]: string | number };
}
