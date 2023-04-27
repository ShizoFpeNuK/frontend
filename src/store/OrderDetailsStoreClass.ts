import { Order } from "../options/model/order.model";
import { IService } from "../options/model/service.model";
import { ISchedule } from "../options/model/schedule.model";
import { ISpecialist } from "../options/model/specialist.model";
import { makeAutoObservable } from "mobx";


class OrderDetailsStoreClass {
  OrderDetailsClientId: number = 7;
  OrderDetailsSpecialist: ISpecialist | undefined = undefined;
  OrderDetailsServices: IService[] = [];
  OrderDetailsDate: string = "";
  OrderDetailsTime: string = "";
  OrderDetailsDateWithTimes: ISchedule | undefined = undefined;

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


  clearStore() {
    orderDetailsStore.deleteOrderDetailsSpecialist();
    orderDetailsStore.deleteOrderDetailsServices()
    orderDetailsStore.deleteOrderDetailsDate();
    orderDetailsStore.deleteOrderDetailsTime();
    orderDetailsStore.deleteOrderDetailsDateWithTimes();
  }

  getOrderDetails(): Order {
    const servicesId: number[] = [];
    this.OrderDetailsServices.map((service: IService) => {
      servicesId.push(service.service_id);
    })

    return {
      client_id: this.OrderDetailsClientId,
      employee_id: this.OrderDetailsSpecialist!.employee_id,
      services_id: servicesId, 
      date: this.OrderDetailsDateWithTimes!.date_correct, 
      time: this.OrderDetailsTime
    }
  }


  get getOrderDetailsTotalCount() {
    let totalCount: number = 0;
    this.OrderDetailsServices.map((service: IService) => {
      totalCount += service.cost
    })
    return totalCount;
  }
}


const orderDetailsStore = new OrderDetailsStoreClass();
export default orderDetailsStore;