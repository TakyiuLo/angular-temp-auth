import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastService, Toast, ToastType } from "../../toast.service";
import { DataShareService } from "../../data-share.service";
import { Router } from "@angular/router";
import { changePassword, handleErrors } from "../api";
import message from "../message";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  private user: Object;
  changePasswordForm: FormGroup;
  constructor(
    private toastService: ToastService,
    private dataShareService: DataShareService
  ) {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(),
      newPassword: new FormControl()
    });
  }

  ngOnInit() {
    this.dataShareService.observer.subscribe(action => {
      if (action) {
        switch (action.type) {
          case "signInSuccess": // for login
            this.user = action.payload.user;
            break;
          default:
            break;
        }
      }
      // console.log("change password received", action);
    });
  }

  changePassword() {
    const { changePasswordSuccess, changePasswordFailure } = message;
    const successToast = new Toast(changePasswordSuccess, ToastType.success);
    const toastSuccess = () => this.toastService.add(successToast);
    const failToast = new Toast(changePasswordFailure, ToastType.error);
    const toastFail = () => this.toastService.add(failToast);

    changePassword(this.changePasswordForm.value, this.user)
      .then(handleErrors) // error handler
      .then(toastSuccess) // toast success
      .catch(toastFail); // toast failure
  }
}
