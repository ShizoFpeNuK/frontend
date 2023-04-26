import axios from "axios";
import { IService } from "../options/model/service.model";


export default class ServicesServices {
  static pathDefault: string = "/services";


  static async getAll(): Promise<IService[]> {
    const services = await axios.get(this.pathDefault);

    return services.data;
  }

  static async create(title: string, description: string) { //Переделать
    if (title) {
      await axios.post(this.pathDefault, {
        title: title,
        description: description,
      });
    }
  }

  static async update(id: string, title: string, description: string) { //Переделать
    await axios.patch(this.pathDefault + "/" + id, {
      title: title,
      description: description,
    });
  }

  static async deleteAll() {
    await axios.delete(this.pathDefault);
  }

  static async deleteOne(id: string) {
    await axios.delete(this.pathDefault + "/" + id);
  }
}