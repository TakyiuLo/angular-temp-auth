import { Injectable } from "@angular/core";

// Model start here //
export class Toast {
  constructor(private message: string, private type: ToastType) {}
}

export enum ToastType {
  success = "success",
  error = "error",
  info = "info",
  warning = "warning"
}
// Model ends here //

// Injectable
@Injectable({
  providedIn: "root"
})
export class ToastService {
  public toasts: Toast[] = [
    // new Toast("Success Message", ToastType.success),
    // new Toast("Error Message", ToastType.error),
    // new Toast("Info Message", ToastType.info),
    // new Toast("Warning Message", ToastType.warning)
  ];

  add(toast: Toast) {
    // console.log("Toast", toast);
    this.toasts.unshift(toast);
    setTimeout(() => this.toasts.pop(), 3000);
  }

  remove(index: number) {
    this.toasts.splice(index, 1);
  }

  clear() {
    this.toasts = [];
  }
}
