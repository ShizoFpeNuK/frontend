import { IClient, IClientAdd, IClientBase } from "../options/model/client.model";
import axios from "axios";


export default class ClientServices {
  static pathDefault: string = "/clients";


  static async getClient(clientBase: IClientBase): Promise<IClient> {
    const client = await axios.post(this.pathDefault + "/info", clientBase);

    return client.data;
  }

  static async getClientById(clientId: number): Promise<IClient> {
    const client = await axios.get(this.pathDefault + "/" + clientId);

    return client.data;
  }

  static async postClient(clientAdd: IClientAdd): Promise<void> {
    await axios.post(this.pathDefault, clientAdd);
  }

  static async deleteClient(clientId: number): Promise<void> {
    await axios.delete(this.pathDefault + "/" + clientId);
  }
}