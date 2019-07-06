import { MDBBootstrapModule } from "angular-bootstrap-md";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AuthGuardService as AuthGuard } from "./auth/auth-guard.service";

import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MainContainerComponent } from "./main-container/main-container.component";
import { FooterComponent } from "./footer/footer.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";
import { SignInComponent } from "./auth/sign-in/sign-in.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { ToastComponent } from "./toast/toast.component";
import { SignOutComponent } from "./auth/sign-out/sign-out.component";
import { ChangePasswordComponent } from "./auth/change-password/change-password.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavbarComponent,
    MainContainerComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ToastComponent,
    SignOutComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
