import { IOrderBase } from "../options/model/order.model";
import { ISchedule, IScheduleWorker } from "../options/model/schedule.model";
import axios from "axios";


export default class ScheduleServices {
  static pathDefault: string = "/schedule";


  static async getScheduleByEmployeeId(employeeId: number): Promise<IScheduleWorker[]> {
    const schedule = await axios.get(`/employees/${employeeId}/${this.pathDefault}`);

    return schedule.data;
  }

  static async getScheduleBySpecialistId(orderBase: IOrderBase): Promise<ISchedule[]> {
    const schedule = await axios.post(`/specialists/${orderBase.employee_id}/period`, {
        establishment_id: orderBase.establishment_id,
        services_id: orderBase.services_id
      });

    return schedule.data;
  }
}