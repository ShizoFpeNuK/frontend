import { makeAutoObservable } from "mobx";
import orderDetailsStore from "./OrderDetailsStoreClass";


class EnrollStoreClass {
  EnrollIsDisabledButtonSpecialist: boolean = false;
  EnrollIsDisabledButtonServices: boolean = true;
  EnrollIsDisabledButtonDates: boolean = true;
  selectButtonSpecialistIsClicked: boolean = false;
  selectButtonServicesIsClicked: boolean = false;
  selectButtonDateIsClicked: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setEnrollIsDisabledButtonSpecialist(boolean: boolean) {
    this.EnrollIsDisabledButtonSpecialist = boolean;
  }

  setEnrollIsDisabledButtonServices(boolean: boolean) {
    this.EnrollIsDisabledButtonServices = boolean;
  }

  setEnrollIsDisabledButtonDates(boolean: boolean) {
    this.EnrollIsDisabledButtonDates = boolean;
  }

  setSelectButtonSpecialistIsClicked(boolean: boolean) {
    this.selectButtonSpecialistIsClicked = boolean;
  }

  setSelectButtonServicesIsClicked(boolean: boolean) {
    this.selectButtonServicesIsClicked = boolean;
  }

  setSelectButtonDateIsClicked(boolean: boolean) {
    this.selectButtonDateIsClicked = boolean;
  }


  get IsNextServices(): boolean {
    if (orderDetailsStore.OrderDetailsServices.length) {
      return true;
    }

    return false;
  }

  get IsNextDates(): boolean {
    if (orderDetailsStore.OrderDetailsDate.length && orderDetailsStore.OrderDetailsTime.length) {
      return true;
    }

    return false;
  }
}


const enrollStore = new EnrollStoreClass();
export default enrollStore;