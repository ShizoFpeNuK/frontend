import { ISpecialist } from "../options/model/specialist.model";
import axios from "axios";


export default class SpecialistsServices {
  static pathDefault: string = 'http://localhost:4000/todos'; //Поменять!!!!!!!!!


  static async getAll(): Promise<ISpecialist[]> {
    const specialists = await axios.get(this.pathDefault);

    return specialists.data;
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