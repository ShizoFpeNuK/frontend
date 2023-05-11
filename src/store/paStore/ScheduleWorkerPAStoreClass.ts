import { IScheduleWorker } from "../../options/model/schedule.model";
import { makeAutoObservable } from "mobx";
import ScheduleServices from "../../services/schedule.service";


class ScheduleWorkerPAStoreClass {
  schedule: IScheduleWorker[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async getScheduleByEmployeeId(employeeId: number) {
    const schedule = await ScheduleServices.getScheduleWorkerByEmployeeId(employeeId);
    this.setSchedule(schedule);
  }


  setSchedule(schedule: IScheduleWorker[]) {
    this.schedule = schedule;
  }

  deleteSchedule() {
    this.setSchedule([]);
  }
}


export default ScheduleWorkerPAStoreClass;