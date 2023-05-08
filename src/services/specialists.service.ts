import { IService } from "../options/model/service.model";
import { ISchedule } from "../options/model/schedule.model";
import { IOrderBase } from "../options/model/order.model";
import { ISpecialist } from "../options/model/specialist.model";
import axios from "axios";


export default class SpecialistsServices {
  static pathDefault: string = "/specialists";


  static async getAll(): Promise<ISpecialist[]> {
    const specialists = await axios.get(this.pathDefault);

    return specialists.data;
  }

  static async getAllServicesBySpecialistId(specialistId: number | string): Promise<IService[]> {
    const services = await axios.get(this.pathDefault + "/" + specialistId + "/services");

    return services.data;
  }

  static async getScheduleBySpecialistId(orderBase: IOrderBase): Promise<ISchedule[]> {
    const schedule = await axios.post(this.pathDefault + "/" + orderBase.employee_id + "/period",
      {
        establishment_id: orderBase.establishment_id,
        services_id: orderBase.services_id
      });

    return schedule.data;
  }
}