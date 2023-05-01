import { ISchedule } from "../options/model/schedule.model";
import { OrderBase } from "../options/model/order.model";
import { makeAutoObservable } from "mobx";
import ScheduleServices from "../services/schedule.service";


class ScheduleStoreClass {
  ScheduleList: ISchedule[] = [];
  ScheduleMonth: string[] = [];


  constructor() {
    makeAutoObservable(this);
  }


  async getScheduleListBySpecialistId(orderBase: OrderBase) {
    const schedules = await ScheduleServices.getScheduleBySpecialistId(orderBase);
    this.deleteScheduleMonth();

    schedules.forEach((schedule: ISchedule) => {
      const scheduleMonth: string = new Date(schedule.date).toLocaleString('ru', { month: 'long' });

      if (!this.ScheduleMonth.length) {
        this.addScheduleMonth(scheduleMonth);
      } else {
        this.ScheduleMonth.every((month: string, i: number) => {
          if (scheduleMonth === month) {
            return false;
          }
          if (i === this.ScheduleMonth.length - 1) {
            this.addScheduleMonth(scheduleMonth);
          }

          return true;
        })
      }
    })

    this.setScheduleList(schedules);
  }

  setScheduleList(schedules: ISchedule[]) {
    this.ScheduleList = schedules;
  }

  setScheduleMonth(months: string[]) {
    this.ScheduleMonth = months
  }

  addScheduleMonth(month: string) {
    this.ScheduleMonth.push(month);
  }

  deleteScheduleBySpecialistList() {
    this.setScheduleList([]);
  }

  deleteScheduleMonth() {
    this.setScheduleMonth([]);
  }
}


const scheduleStore = new ScheduleStoreClass();
export default scheduleStore;