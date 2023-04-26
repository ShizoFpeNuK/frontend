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


  setSpecialistsList(specialists: ISpecialist[]) {
    this.SpecialistsList = specialists;
  }
}


const specialistsStore = new SpecialistsStoreClass();
export default specialistsStore;