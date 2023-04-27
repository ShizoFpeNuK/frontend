import axios from "axios";
import { Order } from "../options/model/order.model";


export default class OrderServices {
  static pathDefault: string = "/lovlu";


  static async postOrder(order: Order): Promise<void> {
    await axios.post(this.pathDefault, order);
  }
}