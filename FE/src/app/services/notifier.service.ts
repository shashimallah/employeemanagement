import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  notificationChange: Subject<Object> = new Subject<Object>();
  msgs: MessageService[] = [];
  timeOut: number = 6000;

  constructor(
    private messageService: MessageService
  ) { }

  success(msg: string): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
    this.clear();
    this.notificationChange.next(this.msgs);
  }

  error(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
    this.clear();
    this.notificationChange.next(this.msgs);
  }

  clear(): void {
    setTimeout(() => {
      this.msgs.splice(0, 1);
    }, this.timeOut);
  }

}
