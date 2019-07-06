import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormGroup, FormControl } from "@angular/forms";
import { ToastService, Toast, ToastType } from "../../toast.service";
import { DataShareService } from "../../data-share.service";
import { SignUpCredentials, LoginCredentials } from "../credentials";
import { Router } from "@angular/router";
import { signIn, handleErrors } from "../api";
import message from "../message";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  signInForm: FormGroup;

  constructor(
    private toastService: ToastService,
    private dataShareService: DataShareService,
    private router: Router
  ) {
    this.signInForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
    this.subscription = this.dataShareService.observer.subscribe(action => {
      if (action) {
        switch (action.type) {
          case "signUpSuccess": // for auto login
            this.signIn(action.payload);
            break;
          default:
            break;
        }
      }
      // console.log("signIn received", action);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // console.log("sign-in Destroy");
  }

  signIn(data: LoginCredentials) {
    const { signInSuccess, signInFailure } = message;
    const successToast = new Toast(signInSuccess, ToastType.success);
    const toastSuccess = () => this.toastService.add(successToast);
    const failToast = new Toast(signInFailure, ToastType.error);
    const toastFail = () => this.toastService.add(failToast);
    const responseToJson = res => res.json();
    const setPayload = this.dataShareService.prepareType("signInSuccess");
    const saveAs = { saveAs: "user" };
    const shareAction = action => this.dataShareService.share(action, saveAs);
    const navToHome = () => this.router.navigate(["/home"]);

    signIn(data ? data.toObject() : this.signInForm.value)
      .then(handleErrors) // error handler
      .then(responseToJson) // change response to json(async)
      .then(setPayload) // prepare action
      .then(shareAction) // broadcast data
      .then(toastSuccess) // toast success
      .then(navToHome) // go to /home
      .catch(toastFail); // toast failure
  }
}
