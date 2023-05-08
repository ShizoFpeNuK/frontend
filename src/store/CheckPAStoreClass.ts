import { ICheck } from "../options/model/check.model";
import { makeAutoObservable } from "mobx";


class CheckPAStoreClass {
  checks: ICheck[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  setChecks(checks: ICheck[]) {
    this.checks = checks;
  }

  deleteChecks() {
    this.setChecks([]);
  }
};


export default CheckPAStoreClass;