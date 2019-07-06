import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MDBBootstrapModule } from "angular-bootstrap-md";

import { AuthGuardService as AuthGuard } from "./auth/auth-guard.service";

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { SignOutComponent } from "./auth/sign-out/sign-out.component";
import { ChangePasswordComponent } from "./auth/change-password/change-password.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "sign-in", component: SignInComponent },
  { path: "login", redirectTo: "sign-in", pathMatch: "full" },
  { path: "sign-up", component: SignUpComponent },
  {
    path: "change-password",
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  { path: "sign-out", component: SignOutComponent, canActivate: [AuthGuard] },
  { path: "logout", redirectTo: "sign-out", pathMatch: "full" },
  { path: "404", component: PageNotFoundComponent },
  { path: "**", redirectTo: "404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
