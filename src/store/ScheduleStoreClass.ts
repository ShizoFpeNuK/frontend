import { ISchedule } from "../options/model/schedule.model";
import { makeAutoObservable } from "mobx";
import ScheduleServices from "../services/schedule.service";


class ScheduleStoreClass {
  ScheduleList: ISchedule[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  async getScheduleListBySpecialistId(specialistId: number | string) {
    const schedule = await ScheduleServices.getScheduleBySpecialistId(specialistId);
    this.setScheduleList(schedule);
  }

  setScheduleList(schedule: ISchedule[]) {
    this.ScheduleList = schedule;
  }

  deleteScheduleBySpecialistList() {
    this.setScheduleList([]);
  }
}


const scheduleStore = new ScheduleStoreClass();
export default scheduleStore;