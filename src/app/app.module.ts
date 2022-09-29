import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { HttpService } from "./services/httpService"


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddEmployeeComponent } from './employee-details/add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-details/employee-list/employee-list.component';
import { BrowserAnimationsModule } 
from '@angular/platform-browser/animations';
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular';
export function loggerCallback(logLevel: LogLevel, message: string) {
   console.log(message);
 }
//  import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
   HTTP_INTERCEPTORS,
   HttpClientModule,
 } from '@angular/common/http';
import { UpdateEmployeeComponent } from './employee-details/update-employee/update-employee.component';
import { FileuploadPopupComponentComponent } from './fileupload-popup-component/fileupload-popup-component.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1; // Remove this line to use Angular Universal
// import { SocketioService } from './services/socketio.service';
import { PointcloudComponent } from './pointcloud/pointcloud.component';

export function MSALInstanceFactory(): IPublicClientApplication {
   
  return new PublicClientApplication({
     auth: {
       clientId: 'd2187334-4e93-43f8-ae78-b657c9c90d2e', // Prod enviroment. Uncomment to use. 
      //  clientId: '8756c079-39cd-412c-8522-73b4f101a187', // PPE testing environment
      //  authority: 'https://login.microsoftonline.com/d29f8412-2bc2-4b21-a547-23791af29efb', // Prod environment. Uncomment to use.
       authority: 'https://login.microsoftonline.com/cb0eedaa-f404-4620-9014-927f34519cd9', // Prod environment. Uncomment to use.

       // authority: 'https://login.windows-ppe.net/common', // PPE testing environment.
       redirectUri: '/',
       postLogoutRedirectUri: '/'
     },
     cache: {
       cacheLocation: BrowserCacheLocation.LocalStorage,
       storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
     },
     system: {
       loggerOptions: {
         loggerCallback,
         logLevel: LogLevel.Info,
         piiLoggingEnabled: false
       }
     }
   });
 }

 export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
   const protectedResourceMap = new Map<string, Array<string>>();
   protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']); // Prod environment. Uncomment to use.
  //  protectedResourceMap.set('http://localhost:3000/*', ['api://9cd4887c-adfb-4966-8324-9629841da63c/access_as_user']);
  //  protectedResourceMap.set('http://localhost:3000/*', ['api://cb3181db-0293-4651-b5d3-61a2b22736f4/general']);
  //  protectedResourceMap.set('https://nodeapp1fordmp.azurewebsites.net/*', ['api://cb3181db-0293-4651-b5d3-61a2b22736f4/general']);


   return {
     interactionType: InteractionType.Redirect,
     protectedResourceMap
   };
 }
 
 export function MSALGuardConfigFactory(): MsalGuardConfiguration {
   return { 
     interactionType: InteractionType.Redirect,
     authRequest: {
       scopes: ['user.read','openid',
       'profile',
       // This is something WE KNOW NOW.
       // 'api://8756c079-39cd-412c-8522-73b4f101a187/General',
      //  'api://cb3181db-0293-4651-b5d3-61a2b22736f4/general',
     // 'General'
   ]
     },
     
     loginFailedRoute: '/login-failed'
   };
 }
@NgModule({
   declarations: [
      AppComponent,
      AddEmployeeComponent,
      EmployeeListComponent,
      UpdateEmployeeComponent,
      FileuploadPopupComponentComponent,
      PointcloudComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      NgbModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatToolbarModule,
      MatMenuModule,
      MatListModule
   ],
   exports: [FileuploadPopupComponentComponent],
   entryComponents: [ FileuploadPopupComponentComponent],
  //  providers: [MyserviceService],
  //  bootstrap: [AppComponent
  //  ],
   providers: [
    HttpService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true
      },
      {
        provide: MSAL_INSTANCE,
        useFactory: MSALInstanceFactory
      },
      {
        provide: MSAL_GUARD_CONFIG,
        useFactory: MSALGuardConfigFactory
      },
      {
        provide: MSAL_INTERCEPTOR_CONFIG,
        useFactory: MSALInterceptorConfigFactory
      },
      MsalService,
      MsalGuard,
      MsalBroadcastService
      // SocketioService
    ],
  
  //  providers: [MyserviceService],
   bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }