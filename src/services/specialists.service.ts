import axios from "axios";
import { ISpecialist } from "../options/model/specialist.model";


export default class SpecialistsServices {
  static pathDefault: string = "/specialists";


  static async getAll(): Promise<ISpecialist[]> {
    const specialists = await axios.get(this.pathDefault);

    return specialists.data;
  }
}