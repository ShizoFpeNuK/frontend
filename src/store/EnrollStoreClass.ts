import { makeAutoObservable } from "mobx";
import orderDetailsStore from "./OrderDetailsStoreClass";


class EnrollStoreClass {
  selectButtonClientIsClicked: boolean = false;
  selectButtonSpecialistIsClicked: boolean = false;
  selectButtonServicesIsClicked: boolean = false;
  selectButtonDateIsClicked: boolean = false;

  isOpenFormFindClient: boolean = true; //new
  isOpenListSpecialist: boolean = false; //true
  isOpenListServices: boolean = false;
  isOpenListDate: boolean = false;
  isSubmitOrder: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setSelectButtonClientIsClicked(boolean: boolean) {
    this.selectButtonClientIsClicked = boolean;
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


  setIsOpenFormFindClient(boolean: boolean) { //new
    this.isOpenFormFindClient = boolean;
  }

  setIsOpenListSpecialist(boolean: boolean) {
    this.isOpenListSpecialist = boolean;
  }

  setIsOpenListServices(boolean: boolean) {
    this.isOpenListServices = boolean;
  }

  setIsOpenListDate(boolean: boolean) {
    this.isOpenListDate = boolean;
  }

  setIsSubmitOrder(boolean: boolean) {
    this.isSubmitOrder = boolean;
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