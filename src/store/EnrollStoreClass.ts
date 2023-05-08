import { makeAutoObservable } from "mobx";
import orderDetailsStore from "./OrderDetailsStoreClass";


class EnrollStoreClass {
  selectButtonClientIsClicked: boolean = false;
  selectButtonEstablishmentIsClicked: boolean = false;
  selectButtonSpecialistIsClicked: boolean = false;
  selectButtonServicesIsClicked: boolean = false;
  selectButtonDateIsClicked: boolean = false;

  isOpenFormFindClient: boolean = true;
  isOpenListEstablishment: boolean = true;
  isOpenListSpecialist: boolean = false;
  isOpenListServices: boolean = false;
  isOpenListDate: boolean = false;
  isSubmitOrder: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setSelectButtonClientIsClicked(boolean: boolean) {
    this.selectButtonClientIsClicked = boolean;
  }
  
  setSelectButtonEstablishmentIsClicked(boolean: boolean) {
    this.selectButtonEstablishmentIsClicked = boolean;
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


  setIsOpenFormFindClient(boolean: boolean) {
    this.isOpenFormFindClient = boolean;
  }

  setIsOpenListEstablishment(boolean: boolean) {
    this.isOpenListEstablishment = boolean;
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

  clearStore() {
    enrollStore.setSelectButtonDateIsClicked(false);
    enrollStore.setSelectButtonServicesIsClicked(false);
    enrollStore.setSelectButtonSpecialistIsClicked(false);
    enrollStore.setSelectButtonClientIsClicked(false);
    enrollStore.setSelectButtonEstablishmentIsClicked(false);
    enrollStore.setIsSubmitOrder(false);
    enrollStore.setIsOpenListDate(false);
    enrollStore.setIsOpenListServices(false);
    enrollStore.setIsOpenListSpecialist(false);
    enrollStore.setIsOpenListEstablishment(false);
    enrollStore.setIsOpenFormFindClient(true);
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