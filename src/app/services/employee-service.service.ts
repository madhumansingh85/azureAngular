import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeServiceService {
  constructor(private httpClient: HttpClient) {}

  getEmployeeDetails(): Observable<any> {
    // let headers = new HttpHeaders({
    //   'Ocp-Apim-Subscription-Key': 'd54ac464dc824506a97994dc7516e0be',
    // });
    // let options = {
    //   headers: headers,
    // };
    return this.httpClient
      .get<any>(`${environment.apiURL}getEmployeeDetails`)
      .pipe(catchError((e) => throwError(e)));
  }

  getRoles(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiURL}getUserDetails`)
      .pipe(catchError((e) => throwError(e)));
  }

  createEmployee(body: any) {
    return this.httpClient
      .post<any>(`${environment.apiURL}createEmployeeDetails`, body)
      .pipe(catchError((e) => throwError(e)));
  }

  updateEmployee(id: any, body: any): Observable<any> {
    return this.httpClient
      .put<any>(`${environment.apiURL}updateEmployeeDetails/${id}`, body)
      .pipe(catchError((e) => throwError(e)));
  }

  deleteEmployee(id: any, body: any): Observable<any> {
    return this.httpClient
      .delete<any>(`${environment.apiURL}deleteEmployee/${id}`, body)
      .pipe(catchError((e) => throwError(e)));
  }
  uploadDocument(inputData: File, id: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', inputData);
    return this.httpClient.post(
      `${environment.apiURL}uploadImage/${id}`,
      formData
    );
  }
}
