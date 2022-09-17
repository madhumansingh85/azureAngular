import {
    HttpClient, HttpHeaders
  } from "@angular/common/http";
  import {
    Injectable
  } from "@angular/core";
  import {
    Observable
  } from "rxjs";
  
  @Injectable()
  export class HttpService {
    constructor(private httpClient: HttpClient) {
  
    }
  
    getData(): Observable < any > {
      
      return this.httpClient
        .get('https://nodeapp1fordmp.azurewebsites.net/getUserDetails')
      // .pipe()
  
    }
}
