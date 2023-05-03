import axios from "axios";
import { ISchedule } from "../options/model/schedule.model";
import { IOrderBase } from "../options/model/order.model";


export default class ScheduleServices {
  static pathDefault: string = "/schedule";


  static async getScheduleBySpecialistId(orderBase: IOrderBase): Promise<ISchedule[]> {
    const schedule = await axios.post(this.pathDefault, orderBase);

    return schedule.data;
  }
  
}