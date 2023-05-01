import axios from "axios";
import { ISchedule } from "../options/model/schedule.model";
import { OrderBase } from "../options/model/order.model";


export default class ScheduleServices {
  static pathDefault: string = "/schedule";


  // static async getScheduleBySpecialistId(specialistId: number | string): Promise<ISchedule[]> {
  //   const schedule = await axios.get(this.pathDefault + "/" + specialistId);

  //   return schedule.data;
  // }

  static async getScheduleBySpecialistId(orderBase: OrderBase): Promise<ISchedule[]> {
    const schedule = await axios.post(this.pathDefault, orderBase);

    return schedule.data;
  }
  
}