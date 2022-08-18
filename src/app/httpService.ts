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
    let header = new HttpHeaders({ "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6Im0xNlNoczZpd3o4WklSZkNkTFh5WDZzT0NNN0pFYWc1SkxSY0NEVENBOGciLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kMjlmODQxMi0yYmMyLTRiMjEtYTU0Ny0yMzc5MWFmMjllZmIvIiwiaWF0IjoxNjYwNTcwNTEyLCJuYmYiOjE2NjA1NzA1MTIsImV4cCI6MTY2MDU3NTMxOCwiYWNjdCI6MSwiYWNyIjoiMSIsImFpbyI6IkFXUUFtLzhUQUFBQXV2TzV2UW1RTy92Q2FYNjhiYmlSRkh4c2d3VlVQdTVrLzRoMFB2Mm9xV1RSdEZvT0F3VktWOEViTnJHOUNFQm1YRzhZVVBoVGNBakhHam5LRGZHWmxueEpSbmNodEg0cmlJQ2NrMkU4eHFJRzVSTGJNMWRFaFJSTlNaNldoNnh1IiwiYWx0c2VjaWQiOiIxOmxpdmUuY29tOjAwMDMwMDAwMUE3QjI4NzciLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6IkV4YW1wbGVBcHAiLCJhcHBpZCI6Ijg3NTZjMDc5LTM5Y2QtNDEyYy04NTIyLTczYjRmMTAxYTE4NyIsImFwcGlkYWNyIjoiMCIsImVtYWlsIjoiZy5wcmFzYW50aC43QGdtYWlsLmNvbSIsImZhbWlseV9uYW1lIjoiUHJhc2FudGgiLCJnaXZlbl9uYW1lIjoiR3VydSIsImlkcCI6ImxpdmUuY29tIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMTM2LjIyNi4yNTAuMTEwIiwibmFtZSI6Ikd1cnUgUHJhc2FudGgiLCJvaWQiOiJiMzU4MGU0Ni03ZjQzLTQ2NmEtOGU4OC1lYjQ2MzI4YmRkODgiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDIxQTY2NTQ3OSIsInJoIjoiMC5BVlVBRW9TZjBzSXJJVXVsUnlONUd2S2Utd01BQUFBQUFBQUF3QUFBQUFBQUFBQ0lBRkUuIiwic2NwIjoiVXNlci5SZWFkIHByb2ZpbGUgb3BlbmlkIGVtYWlsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiMjUwcFc5d2JnSU5tSk5jUk9FTzBhUWtBRTFBNlEwSHNaNjlPdWM5WTRyNCIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJBUyIsInRpZCI6ImQyOWY4NDEyLTJiYzItNGIyMS1hNTQ3LTIzNzkxYWYyOWVmYiIsInVuaXF1ZV9uYW1lIjoibGl2ZS5jb20jZy5wcmFzYW50aC43QGdtYWlsLmNvbSIsInV0aSI6ImlMOElEUlBfXzBleWVUa1VwUVpIQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjEzYmQxYzcyLTZmNGEtNGRjZi05ODVmLTE4ZDNiODBmMjA4YSJdLCJ4bXNfc3QiOnsic3ViIjoiNkZKVFZXSS1BdzdiQVdkVVVJNUVrWTY5a2JPZ05GVFRTbVVieHJUMXN5QSJ9LCJ4bXNfdGNkdCI6MTYzOTczNDczM30.YWaHKLKwh12P5ZEnZQ3NPYavtNKZVDXonlIzQaXrqpE8-rnXBOguUurcPPqDwxyPYIIS5bnfes_TK-sfkTRENAHEkludkUgFsndvBmXudJ68zxXAWA48kCEhbrevmC-W5yFHEhYKi-NVb9-gdS0mRYlLdfkfmcj-S9ZG-sF-7Rvi_owh_e0wRKLu0EwEu0clnIfsv6i2VRMtMK-NNsysOVL5Op0wEXi5HwiUqcX1r0W7IKnYVqgYD654ZpsLTvZi2rXoPY06YfCphLthxLk8eWp8HHHkQPxSbfx4c0JGjtGSEHTP40vpGv_y3Sf2fZRdVbnqyM18pfPZEx4xSWgyEQ"});

    const requestOptions = {  headers: header};                                                                                                                                                                            
    
    return this.httpClient
      .get('http://localhost:3000/api')
    // .pipe()

  }
  addData(data: any): Observable < any > {
    return this.httpClient
      .post(
        'http://localhost:3000/addEntitlement',
        data
      )
    // .pipe()

  }
}
