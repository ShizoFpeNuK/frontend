import { IService } from "../options/model/service.model";
import { makeAutoObservable } from "mobx";
import ServicesServices from "../services/services.service";


class ServicesStoreClass {
  ServicesList: IService[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async getServicesList(): Promise<void> {
    const services: IService[] = await ServicesServices.getAll();
    this.setServicesList(services);
  }


  setServicesList(services: IService[]) {
    this.ServicesList = services;
  }
}


const servicesStore = new ServicesStoreClass();
export default servicesStore;