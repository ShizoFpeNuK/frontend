import axios from "axios";
import { IClient, IClientAdd, IClientBase } from "../options/model/client.model";


export default class ClientServices {
  static pathDefault: string = "/client";


  static async getClient(clientBase: IClientBase): Promise<IClient> {
    const client = await axios.post(this.pathDefault + "/info", clientBase);

    return client.data;
  }

  static async postClient(clientAdd: IClientAdd): Promise<void> {
    await axios.post(this.pathDefault, clientAdd);
  }

  static async deleteClient(clientId: number): Promise<void> {
    await axios.delete(this.pathDefault + "/" + clientId);
  }
}