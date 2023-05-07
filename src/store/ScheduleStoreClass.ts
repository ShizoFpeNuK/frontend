import { ISchedule } from "../options/model/schedule.model";
import { IOrderBase } from "../options/model/order.model";
import { makeAutoObservable } from "mobx";
import SpecialistsServices from "../services/specialists.service";


class ScheduleStoreClass {
  ScheduleListBySpecialist: ISchedule[] = [];
  ScheduleMonth: string[] = [];


  constructor() {
    makeAutoObservable(this);
  }


  async getScheduleListBySpecialistId(orderBase: IOrderBase) {
    const schedules = await SpecialistsServices.getScheduleBySpecialistId(orderBase);
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

    this.setScheduleListBySpecialist(schedules);
  }

  setScheduleListBySpecialist(schedules: ISchedule[]) {
    this.ScheduleListBySpecialist = schedules;
  }

  setScheduleMonth(months: string[]) {
    this.ScheduleMonth = months
  }

  addScheduleMonth(month: string) {
    this.ScheduleMonth.push(month);
  }

  deleteScheduleListBySpecialist() {
    this.setScheduleListBySpecialist([]);
  }

  deleteScheduleMonth() {
    this.setScheduleMonth([]);
  }
}


const scheduleStore = new ScheduleStoreClass();
export default scheduleStore;