import { IService } from "../options/model/service.model";
import axios from "axios";


export default class ServicesServices {
  static pathDefault: string = "/services";


  static async getAll(): Promise<IService[]> {
    const services = await axios.get(this.pathDefault);

    return services.data;
  }
}