import { IOrder } from "../options/model/order.model";
import { IService } from "../options/model/service.model";
import { ISchedule } from "../options/model/schedule.model";
import { ISpecialist } from "../options/model/specialist.model";
import { makeAutoObservable } from "mobx";
import { IClientBase } from "../options/model/client.model";


class OrderDetailsStoreClass {
  OrderDetailsClient: IClientBase | undefined = undefined;
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

  setOrderDetailsClient(client: IClientBase | undefined) {
    this.OrderDetailsClient = client;
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


  deleteOrderDetailsService(serviceId: number) {
    this.OrderDetailsServices.every(el => {
      if (el.service_id === serviceId) {
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

  deleteOrderDetailsClient() {
    this.setOrderDetailsClient(undefined);
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
    this.deleteOrderDetailsClient();
    this.deleteOrderDetailsSpecialist();
    this.deleteOrderDetailsServices()
    this.deleteOrderDetailsDate();
    this.deleteOrderDetailsTime();
    this.deleteOrderDetailsDateWithTimes();
  }

  getOrderDetailServicesId(): number[] {
    const servicesId: number[] = [];
    this.OrderDetailsServices.forEach((service: IService) => {
      servicesId.push(service.service_id);
    })
    return servicesId;
  }

  getOrderDetails(): IOrder {
    return {
      client_id: this.OrderDetailsClient!.client_id,
      employee_id: this.OrderDetailsSpecialist!.employee_id,
      services_id: this.getOrderDetailServicesId(),
      date: this.OrderDetailsDateWithTimes!.date,
      time: this.OrderDetailsTime
    }
  }


  get getOrderDetailsTotalCount() {
    let totalCount: number = 0;
    this.OrderDetailsServices.forEach((service: IService) => {
      totalCount += service.cost
    })
    return totalCount;
  }

  get getOrderDetailsTotalTime() {
    const totalTime: Date = new Date(`${this.OrderDetailsDateWithTimes!.date} ${this.OrderDetailsTime}:00`);
    this.OrderDetailsServices.forEach((service: IService) => {
      totalTime.setMinutes(totalTime.getMinutes() + Number(service.duration));
    })
    return totalTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }
}


const orderDetailsStore = new OrderDetailsStoreClass();
export default orderDetailsStore;