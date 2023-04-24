import { makeAutoObservable } from "mobx";
import { ISpecialist } from "../options/model/specialist.model";



class OrderDetailsStoreClass {
  OrderDetailsSpecialistName: string = "";
  OrderDetailsServices: string[] = [];
  // OrderDetailsTotalCount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }


  setOrderDetailsSpecialist(specialistName: string) {
    this.OrderDetailsSpecialistName = specialistName;
  }

  setOrderDetailsServices(service: string) {
    this.OrderDetailsServices.push(service);
  }

  deleteOrderDetailsServices(id: number) {
    this.OrderDetailsServices.splice(id, 1)
  }

  // get setOrderDetailsTotalCount() {
  //   return
  // }
}


const orderDetailsStore = new OrderDetailsStoreClass();
export default orderDetailsStore;