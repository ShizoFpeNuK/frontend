import { makeAutoObservable } from "mobx";
import { IClient } from "../options/model/client.model";


class ClientStoreClass {
  client: IClient | undefined = undefined;
  isNotFindClient: boolean = false;
  isCreateClient: boolean = false;
  isConflictClient: boolean = false;
  isDeleteClient: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setClient(client: IClient | undefined) {
    this.client = client;
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


  deleteClient() {
    this.setClient(undefined);
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

  clearStore() {
    this.deleteClient();
    this.deleteIsNotFindClient();
    this.deleteIsCreateClient();
    this.deleteIsConflictClient();
    this.deleteIsDeleteClient();
  }
};


const clientStore = new ClientStoreClass();
export default clientStore;