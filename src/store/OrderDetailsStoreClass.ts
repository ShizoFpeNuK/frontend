import { makeAutoObservable } from "mobx";
import { IService } from "../options/model/service.model";
import { ISpecialist } from "../options/model/specialist.model";
import { ISchedule } from "../options/model/schedule.model";



class OrderDetailsStoreClass {
  OrderDetailsSpecialist: ISpecialist | undefined = undefined;
  OrderDetailsServices: IService[] = [];
  OrderDetailsDate: string = "";
  OrderDetailsTime: string = "";
  OrderDetailsDateWithTimes: ISchedule | undefined = undefined;
  // OrderDetailsTotalCount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addOrderDetailsService(service: IService) {
    this.OrderDetailsServices.push(service);
  }

  setOrderDetailsServices(services: IService[]) {
    this.OrderDetailsServices = services;
  }

  setOrderDetailsSpecialist(specialist: ISpecialist | undefined) {
    this.OrderDetailsSpecialist = specialist;
  }


  setOrderDetailsDate(date: string) {
    this.OrderDetailsDate = date;
  }

  setOrderDetailsTime(time: string) {
    this.OrderDetailsTime = time;
  }

  setOrderDetailsDateWithTimes(schedule: ISchedule | undefined) {
    this.OrderDetailsDateWithTimes = schedule;
  }
  
  deleteOrderDetailsService(service: IService) {
    this.OrderDetailsServices.every(el => {
      if (el.service_id === service.service_id) {
        const findIndex = this.OrderDetailsServices.indexOf(el)
        this.OrderDetailsServices.splice(findIndex, 1);
        return false;
      }

      return true;
    })
  }

  deleteOrderDetailsServices() {
    this.setOrderDetailsServices([]);
  }

  deleteOrderDetailsSpecialist() {
    this.setOrderDetailsSpecialist(undefined);
  }

  deleteOrderDetailsDate() {
    this.setOrderDetailsDate("");
  }

  deleteOrderDetailsTime() {
    this.setOrderDetailsTime("");
  }

  deleteOrderDetailsDateWithTimes() {
    this.setOrderDetailsDateWithTimes(undefined);
  }


  // get setOrderDetailsTotalCount() {
  //   return
  // }
}


const orderDetailsStore = new OrderDetailsStoreClass();
export default orderDetailsStore;