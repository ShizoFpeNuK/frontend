import axios from "axios";
import { ISchedule } from "../options/model/schedule.model";


export default class ScheduleServices {
  static pathDefault: string = "/test";


  static async getScheduleBySpecialistId(specialistId: number | string): Promise<ISchedule[]> {
    const schedule = await axios.get(this.pathDefault + "/" + specialistId);

    return schedule.data;
  }
}