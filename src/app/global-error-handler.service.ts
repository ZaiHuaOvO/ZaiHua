// global-error-handler.service.ts
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

    constructor(
        private router: Router,
        private message: NzMessageService
    ) { }

    handleError(error: any): void {
        this.message.create('error', `出现错误(。┰ω┰。): ${error.message}`);
    }
}
