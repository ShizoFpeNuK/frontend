import { IScheduleWorker } from "../options/model/schedule.model";
import { makeAutoObservable } from "mobx";


class SchedulePAStoreClass {
  schedule: IScheduleWorker[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  setSchedule(schedule: IScheduleWorker[]) {
    this.schedule = schedule;
  }

  deleteSchedule() {
    this.setSchedule([]);
  }
}


export default SchedulePAStoreClass;