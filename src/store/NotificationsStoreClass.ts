import { makeAutoObservable } from "mobx";


class NotificationsStoreClass {
  isNotFindChecks: boolean = false;
  isEmptyChecks: boolean = false;

  isNotFindClient: boolean = false;
  isCreateClient: boolean = false;
  isConflictClient: boolean = false;
  isDeleteClient: boolean = false;

  isSubmitOrder: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsNotFindChecks(boolean: boolean) {
    this.isNotFindChecks = boolean;
  }

  setIsEmptyChecks(boolean: boolean) {
    this.isEmptyChecks = boolean;
  }

  deleteIsNotFindChecks() {
    this.setIsNotFindChecks(false);
  }

  deleteIsEmptyChecks() {
    this.setIsEmptyChecks(false);
  }

  deleteNotificationsChecks() {
    this.deleteIsNotFindChecks();
    this.deleteIsEmptyChecks();
  }


  setIsNotFindClient(boolean: boolean) {
    this.isNotFindClient = boolean;
  }

  setIsCreateClient(boolean: boolean) {
    this.isCreateClient = boolean;
  }

  setIsConflictClient(boolean: boolean) {
    this.isConflictClient = boolean;
  }

  setIsDeleteClient(boolean: boolean) {
    this.isDeleteClient = boolean;
  }

  deleteIsNotFindClient() {
    this.setIsNotFindClient(false);
  }

  deleteIsCreateClient() {
    this.setIsCreateClient(false);
  }

  deleteIsConflictClient() {
    this.setIsConflictClient(false);
  }

  deleteIsDeleteClient() {
    this.setIsDeleteClient(false);
  }

  deleteNotificationsClient() {
    this.deleteIsNotFindClient();
    this.deleteIsCreateClient();
    this.deleteIsConflictClient();
    this.deleteIsDeleteClient();
  }


  setIsSubmitOrder(boolean: boolean) {
    this.isSubmitOrder = boolean;
  }

  deleteIsSubmitOrder() {
    this.setIsSubmitOrder(false);
  }
}


const notificationsStore = new NotificationsStoreClass();
export default notificationsStore;