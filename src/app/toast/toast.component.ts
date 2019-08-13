import { Component, OnInit } from "@angular/core";
import { ToastService, ToastType } from "../toast.service";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
  query,
  stagger,
  group
} from "@angular/animations";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
  animations: [
    trigger("listAnimation", [
      transition(
        "* => *",
        group([
          query(
            ":leave",
            [stagger(100, [animate("0.2s", style({ opacity: 0 }))])],
            { optional: true }
          ),
          query(
            ":enter ~ .toastr",
            [
              style({ transform: "translateY(-100px)" }),
              animate(".1s linear", style({ transform: "none" }))
            ],
            { optional: true }
          ),
          query(
            ":enter",
            [
              style({ opacity: 0, transform: "translate(40px)" }),
              animate(
                ".2s .1s ease-out",
                style({
                  opacity: 1,
                  transform: "translateX(0px)"
                })
              )
            ],
            { optional: true }
          )
        ])
      )
    ])
  ]
})
export class ToastComponent implements OnInit {
  constructor(public toastService: ToastService) {}

  ngOnInit() {}

  getIcon(type: ToastType) {
    switch (type) {
      case ToastType.success: {
        return "check-circle";
      }
      case ToastType.error: {
        return "times-circle";
      }
      case ToastType.info: {
        return "info-circle";
      }
      case ToastType.warning: {
        return "exclamation-triangle";
      }
      default: {
        return "info-circle";
      }
    }
  }
}
