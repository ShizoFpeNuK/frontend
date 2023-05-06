import { makeAutoObservable } from "mobx";
import { ICheck } from "../options/model/check.model";


class CheckStoreClass {
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


const checkStore = new CheckStoreClass();
export default checkStore;