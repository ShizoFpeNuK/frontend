import axios from "axios";
import { IService } from "../options/model/service.model";


export default class ServicesServices {
  static pathDefault: string = "/services";


  static async getAll(): Promise<IService[]> {
    const services = await axios.get(this.pathDefault);

    return services.data;
  }

  static async getAllServicesBySpecialistId(specialistId: number | string): Promise<IService[]> {
    const services = await axios.get(this.pathDefault + "/specialist/" + specialistId);

    return services.data;
  }
}