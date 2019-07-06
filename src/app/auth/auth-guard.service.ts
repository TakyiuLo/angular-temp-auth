import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { DataShareService } from "../data-share.service";
import { ToastService, Toast, ToastType } from "../toast.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private dataShareService: DataShareService,
    private toastService: ToastService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.dataShareService.store.user) {
      this.router.navigate(["login"]);
      const warningToast = new Toast("Please login first", ToastType.warning);
      this.toastService.add(warningToast);
      return false;
    }
    return true;
  }
}
