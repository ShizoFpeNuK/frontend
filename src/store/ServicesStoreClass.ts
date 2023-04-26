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

  async getServicesListBySpecialistId(specialistId: number | string): Promise<void> {
    const services: IService[] = await ServicesServices.getAllServicesBySpecialistId(specialistId);
    this.setServicesList(services);
  }

  deleteServicesList() {
    this.setServicesList([]);
  }


  setServicesList(services: IService[]) {
    this.ServicesList = services;
  }
}


const servicesStore = new ServicesStoreClass();
export default servicesStore;