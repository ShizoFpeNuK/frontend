import axios from "axios";
import { ICheck, ICheckDetails } from "../options/model/check.model";


export default class CheckServices {
  static pathDefault: string = "/client";


  static async getChecks(clientId: number): Promise<ICheck[]> {
    const checks = await axios.get(this.pathDefault + "/" + clientId + "/checks");

    return checks.data;
  }

  static async deleteCheck(clientId: number, checkId: number): Promise<void> {
    await axios.delete(this.pathDefault + "/" + clientId + "/" + checkId); //??
  }

  static async getCheckDetails(checkId: number): Promise<ICheckDetails> {
    const details = await axios.get(this.pathDefault + "/" + checkId);

    return details.data;
  }
}