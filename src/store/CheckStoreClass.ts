import { makeAutoObservable } from "mobx";
import { ICheck } from "../options/model/check.model";


class CheckStoreClass {
  checks: ICheck[] = [];
  isNotFindChecks: boolean = false;
  isEmptyChecks: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setChecks(checks: ICheck[]) {
    this.checks = checks;
  }

  setIsNotFindChecks(boolean: boolean) {
    this.isNotFindChecks = boolean;
  }

  setIsEmptyChecks(boolean: boolean) {
    this.isEmptyChecks = boolean;
  }

  deleteChecks() {
    this.setChecks([]);
  }

  deleteIsNotFindChecks() {
    this.setIsNotFindChecks(false);
  }

  deleteIsEmptyChecks() {
    this.setIsEmptyChecks(false);
  }
};


const checkStore = new CheckStoreClass();
export default checkStore;