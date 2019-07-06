import { Component, OnInit, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DataShareService } from "../data-share.service";
// needed this to redirect nav-links
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  user: Object = null;

  constructor(
    private router: Router,
    private dataShareService: DataShareService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.dataShareService.observer.subscribe(action => {
      if (action) {
        switch (action.type) {
          case "signInSuccess": // for login
            this.user = action.payload.user;
            break;
          case "signOutSuccess":
            this.user = null;
          default:
            break;
        }
      }
      this.changeDetectorRef.detectChanges(); // needed this to detect changes
      // console.log("navbar received", res);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // console.log("navbar Destroy");
  }
}
