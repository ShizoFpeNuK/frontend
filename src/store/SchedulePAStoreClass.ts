import { IScheduleWorker } from "../options/model/schedule.model";
import { makeAutoObservable } from "mobx";
import ScheduleServices from "../services/schedule.service";


class SchedulePAStoreClass {
  schedule: IScheduleWorker[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async getScheduleByEmployeeId(employeeId: number) {
    const schedule = await ScheduleServices.getScheduleByEmployeeId(employeeId);
    this.setSchedule(schedule);
  }


  setSchedule(schedule: IScheduleWorker[]) {
    this.schedule = schedule;
  }

  deleteSchedule() {
    this.setSchedule([]);
  }
}


export default SchedulePAStoreClass;