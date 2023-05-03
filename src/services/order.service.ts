import axios from "axios";
import { IOrder } from "../options/model/order.model";


export default class OrderServices {
  static pathDefault: string = "/lovlu";


  static async postOrder(order: IOrder): Promise<void> {
    await axios.post(this.pathDefault, order);
  }
}