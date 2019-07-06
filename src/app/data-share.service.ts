import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

/* DataShareService interfaces start here */
export interface Action {
  readonly type: string;
  readonly payload: any;
}

/* DataShareService interfaces ends here */

@Injectable({
  providedIn: "root"
})
export class DataShareService {
  // using BehaviorSubject so late subscriber will still get the most recent source
  private subject: BehaviorSubject<any> = new BehaviorSubject("Default Data");
  public observer = this.subject.asObservable();
  public store = { user: null }; // store will have most up to date data

  constructor() {
    this.share({ type: "default", payload: "OK" });
  }

  share(action: Action, options: any = { saveAs: null }) {
    if (options.saveAs) {
      this.store[options.saveAs] = action.payload;
    }
    // console.log("shared", action);
    this.subject.next(action);
  }

  // prepare type returns a pre-defined type function
  prepareType(type: string) {
    return (payload: any) => ({
      type,
      payload
    });
  }
}
