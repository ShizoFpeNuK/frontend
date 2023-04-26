import { makeAutoObservable } from "mobx";
import { IService } from "../options/model/service.model";
import { ISpecialist } from "../options/model/specialist.model";



class OrderDetailsStoreClass {
  OrderDetailsSpecialist: ISpecialist | undefined = undefined;
  OrderDetailsServices: IService[] = [];
  // OrderDetailsTotalCount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }


  setOrderDetailsSpecialist(specialist: ISpecialist) {
    this.OrderDetailsSpecialist = specialist;
  }

  setOrderDetailsService(service: IService) {
    this.OrderDetailsServices.push(service);
  }

  deleteOrderDetailsService(service: IService) {
    this.OrderDetailsServices.every(el => {
      if (el.service_id === service.service_id) {
        const findIndex = this.OrderDetailsServices.indexOf(el)
        this.OrderDetailsServices.splice(findIndex, 1);
        console.log("ArrayServices ", this.OrderDetailsServices);
        console.log("findIndex ", findIndex);
        return false;
      }
      
      return true;
    })
  }

  deleteOrderDetailsSpecialist() {
    this.OrderDetailsSpecialist = undefined;
  }

  // get setOrderDetailsTotalCount() {
  //   return
  // }
}


const orderDetailsStore = new OrderDetailsStoreClass();
export default orderDetailsStore;