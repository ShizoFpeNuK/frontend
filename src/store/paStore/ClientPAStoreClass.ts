import { IClient } from "../../options/model/client.model";
import { makeAutoObservable } from "mobx";


class ClientPAStoreClass {
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


export default ClientPAStoreClass;