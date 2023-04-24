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

  async createToDo(title: string, description: string): Promise<void> {
    await ServicesServices.create(title, description);
    this.getServicesList();
  }

  async updateToDo(id: string, title: string, description: string): Promise<void> {
    await ServicesServices.update(id, title, description);
    this.getServicesList();
  }

  async deleteToDoList() {
    await ServicesServices.deleteAll();
    this.getServicesList();
  }

  async deleteToDo(id: string) {
    await ServicesServices.deleteOne(id);
    this.getServicesList();
  }


  setServicesList(services: IService[]) {
    this.ServicesList = services;
  }
}


const servicesStore = new ServicesStoreClass();
export default servicesStore;