import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: any;
  constructor() {}
  sendstatus(data: any) {
    this.socket = io(environment.socketURL);
    console.log(data);
    this.socket.emit('data-from-client', data);
  }

  public getNotification() {
    this.socket = io(environment.socketURL);

    return new Observable((observer) => {
      this.socket.on('updated-record-in-db', (resp: any) => {
        observer.next(resp);
      });
    });
    // return this.socket.fromEvent('getWorkOrderStatusFlow');
  }

  //    public getNotification(): any {
  //     this.socket = io(environment.socketURL);

  //   debugger;
  //   this.socket.on('updated-record-in-db', (resp:any) => {
  //     console.log(resp)
  //   return resp

  //  });
  //     }
}
