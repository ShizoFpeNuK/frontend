import { IService } from "../options/model/service.model";
import { makeAutoObservable } from "mobx";
import ServicesServices from "../services/services.service";


class ServicesStoreClass {
  ServicesListHome: IService[] = [];
  ServicesList: IService[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  
  async getServicesListHome(): Promise<void> {
    const services: IService[] = await ServicesServices.getAll();
    this.setServicesListHome(services);
  }

  async getServicesList(): Promise<void> {
    const services: IService[] = await ServicesServices.getAll();
    this.setServicesList(services);
  }

  async getServicesListBySpecialistId(specialistId: number | string): Promise<void> {
    const services: IService[] = await ServicesServices.getAllServicesBySpecialistId(specialistId);
    this.setServicesList(services);
  }

  setServicesListHome(services: IService[]) {
    this.ServicesListHome = services;
  }

  setServicesList(services: IService[]) {
    this.ServicesList = services;
  }

  deleteServicesList() {
    this.setServicesList([]);
  }
}


const servicesStore = new ServicesStoreClass();
export default servicesStore;