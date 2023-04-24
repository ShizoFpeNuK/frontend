import axios from "axios";
import { IService } from "../options/model/service.model";


axios.defaults.withCredentials = true;


export default class ServicesServices {
  static pathDefault: string = "http://25.39.159.67:8000/services";

  static async getAll(): Promise<IService[]> {
    const services = await axios.get(this.pathDefault);

    return services.data;
  }

  //удалить
  static async login() {
    await axios.post("http://25.39.159.67:8000/login",
      {
        username: "vas",
        password: "123"
      },
      { 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
      },
      
    )
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
    await axios.patch(this.pathDefault + '/' + id, {
      title: title,
      description: description,
    });
  }

  static async deleteAll() {
    await axios.delete(this.pathDefault);
  }

  static async deleteOne(id: string) {
    await axios.delete(this.pathDefault + '/' + id);
  }
}