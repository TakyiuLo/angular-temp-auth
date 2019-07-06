import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastService, Toast, ToastType } from "../../toast.service";
import { DataShareService, Action } from "../../data-share.service";
import { SignUpCredentials, LoginCredentials } from "../credentials";
import { Router } from "@angular/router";
import { signUp, handleErrors } from "../api";
import message from "../message";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  private signIn: any;
  signUpForm: FormGroup;

  constructor(
    private toastService: ToastService,
    private dataShareService: DataShareService,
    private router: Router
  ) {
    this.signUpForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      password_confirmation: new FormControl()
    });
  }

  ngOnInit() {}

  signUp() {
    const { signUpSuccess, signUpFailure } = message;
    const successToast = new Toast(signUpSuccess, ToastType.success);
    const toastSuccess = () => this.toastService.add(successToast);
    const failToast = new Toast(signUpFailure, ToastType.error);
    const toastFail = () => this.toastService.add(failToast);
    const value = this.signUpForm.value;
    const signUpCredentials: SignUpCredentials = new SignUpCredentials(
      value.email,
      value.password,
      value.password_confirmation
    );
    const loginCredentials: LoginCredentials = signUpCredentials.toLoginCredentials();
    const action: Action = this.dataShareService.prepareType("signUpSuccess")(
      loginCredentials
    );
    const shareAction = () => this.dataShareService.share(action);
    const navToLogin = () => this.router.navigate(["/login"]);

    signUp(value)
      .then(handleErrors) // error handler
      .then(toastSuccess) // toast success
      .then(shareAction) // send credentials to SignInComponent
      .then(navToLogin) // go to /login to mount SignInComponent to login
      .catch(toastFail); // toast failure
  }
}
