import { Component, Inject } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, PopupRequest, RedirectRequest, EventMessage, EventType } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { HttpService } from './services/httpService';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'My Angular Project!';
   
  name = 'Angular';
  page = 1;
  pageSize =10;
//   items = ['Shop1','Shop2','Shop3','Shop4','Shop5','Shop6','Shop7','Shop8','Shop9','Shop10'];

   onClickSubmit(data : any) {
      alert("Entered Email id : " + data.emailid);
   }
   isIframe = false;
   loginDisplay = false;
   private readonly _destroying$ = new Subject<void>();
   items:any;
   appService:any = {}
   constructor(
     @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
     private authService: MsalService,
     private httpService:HttpService,
     private msalBroadcastService: MsalBroadcastService
   ) {}
     onClickApi(){
       this.httpService.getData().subscribe((res)=>{
         this.items = res
         this.appService.items = res
         console.log('!!!!!!!!! ',res)
       })
     }
   async ngOnInit(): Promise<void> {
     
     this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
     this.setLoginDisplay();
 
     this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
     this.msalBroadcastService.msalSubject$
       .pipe(
         filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
       )
       .subscribe((result: EventMessage) => {
         if (this.authService.instance.getAllAccounts().length === 0) {
           window.location.pathname = "/";
         } else {
           this.setLoginDisplay();
         }
       });
     
     this.msalBroadcastService.inProgress$
       .pipe(
         filter((status: InteractionStatus) => status === InteractionStatus.None),
         takeUntil(this._destroying$)
       )
       .subscribe(() => {
         this.setLoginDisplay();
         this.checkAndSetActiveAccount();
       })
       if(!this.loginDisplay){
       if (this.msalGuardConfig.authRequest){
        await this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
      } else {
        await this.authService.loginRedirect();
      }
    }
   }
 
   setLoginDisplay() {
     this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
   }
 
   checkAndSetActiveAccount(){
     /**
      * If no active account set but there are accounts signed in, sets first account to active account
      * To use active account set here, subscribe to inProgress$ first in your component
      * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
      */
     let activeAccount = this.authService.instance.getActiveAccount();
 
     if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
       let accounts = this.authService.instance.getAllAccounts();
       this.authService.instance.setActiveAccount(accounts[0]);
     }
   }
 
   loginRedirect() {
     if (this.msalGuardConfig.authRequest){
       this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
     } else {
       this.authService.loginRedirect();
     }
   }
 
   loginPopup() {
     if (this.msalGuardConfig.authRequest){
       this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
         .subscribe((response: AuthenticationResult) => {
           this.authService.instance.setActiveAccount(response.account);
         });
       } else {
         this.authService.loginPopup()
           .subscribe((response: AuthenticationResult) => {
             this.authService.instance.setActiveAccount(response.account);
       });
     }
   }
 
   logout(popup?: boolean) {
     if (popup) {
       this.authService.logoutPopup({
         mainWindowRedirectUri: "/"
       });
     } else {
       this.authService.logoutRedirect();
     }
   }
 
   ngOnDestroy(): void {
     this._destroying$.next(undefined);
     this._destroying$.complete();
   }
 

}