import { ISpecialist } from "../options/model/specialist.model";
import { makeAutoObservable } from "mobx";
import SpecialistsServices from "../services/specialists.service";


class SpecialistsStoreClass {
  SpecialistsList: ISpecialist[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getSpecialistsList(): Promise<void> {
    const specialists: ISpecialist[] = await SpecialistsServices.getAll();
    this.setSpecialistsList(specialists);
  }

  async createSpecialist() {
    // await SpecialistsServices.create()
    this.getSpecialistsList();
  }

  async updateSpecialist(id: string) { //string?
    // await SpecialistsServices.update()
    this.getSpecialistsList();
  }

  async deleteSpecialistsList() {
    await SpecialistsServices.deleteAll();
    this.getSpecialistsList();
  }

  async deleteSpecialist(id: string) { //string?
    await SpecialistsServices.deleteOne(id);
    this.getSpecialistsList();
  }


  setSpecialistsList(specialists: ISpecialist[]) {
    this.SpecialistsList = specialists;
  }
}


const specialistsStore = new SpecialistsStoreClass();
export default specialistsStore;