import { IScheduleWorker } from "../options/model/schedule.model";
import axios from "axios";


export default class ScheduleServices {
  static pathDefault: string = "/schedule";


  static async getScheduleByEmployeeId(employeeId: number): Promise<IScheduleWorker[]> {
    const schedule = await axios.get("/employees/" + employeeId);

    return schedule.data;
  }
}