import { makeAutoObservable } from "mobx";
import { IClient } from "../options/model/client.model";


class ClientStoreClass {
  client: IClient | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }


  setClient(client: IClient | undefined) {
    this.client = client;
  }

  deleteClient() {
    this.setClient(undefined);
  }
};


const clientStore = new ClientStoreClass();
export default clientStore;