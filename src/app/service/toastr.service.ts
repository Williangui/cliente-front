import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {}

  showError(message: string, title?: string) {
    this.toastr.error(message, title, {
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      toastClass: 'toast-error',
    });
  }
}
