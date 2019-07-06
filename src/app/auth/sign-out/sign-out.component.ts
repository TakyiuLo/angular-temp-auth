import { Component, OnInit } from "@angular/core";
import { ToastService, Toast, ToastType } from "../../toast.service";
import { DataShareService, Action } from "../../data-share.service";
import { Router } from "@angular/router";
import { signOut, handleErrors } from "../api";
import message from "../message";

@Component({
  selector: "app-sign-out",
  templateUrl: "./sign-out.component.html",
  styleUrls: ["./sign-out.component.scss"]
})
export class SignOutComponent implements OnInit {
  constructor(
    private toastService: ToastService,
    private dataShareService: DataShareService,
    private router: Router
  ) {}

  ngOnInit() {
    const { signOutSuccess } = message;
    const successToast = new Toast(signOutSuccess, ToastType.success);
    const action: Action = { type: "signOutSuccess", payload: null };

    this.dataShareService.share(action); // set user to null
    this.toastService.add(successToast); // toast sign out
    this.router.navigate(["/home"]); // navigate to /home
  }
}
