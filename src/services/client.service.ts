import { IClient, IClientCreate, IClientBase, IClientUpdate } from "../options/model/client.model";
import axios from "axios";


export default class ClientServices {
  static pathDefault: string = "/clients";


  static async getClientByTelephone(clientBase: IClientBase): Promise<IClient> {
    const client = await axios.post(`${this.pathDefault}/info`, clientBase);

    return client.data;
  }

  static async getClient(clientId: number): Promise<IClient> {
    const client = await axios.get(`${this.pathDefault}/${clientId}`);

    return client.data;
  }

  static async createClient(clientAdd: IClientCreate): Promise<void> {
    await axios.post(this.pathDefault, clientAdd);
  }

  static async updateClient(clientId: number, clientUpdate: IClientUpdate): Promise<void> {
    await axios.patch(`${this.pathDefault}/${clientId}`, clientUpdate);
  }

  static async deleteClient(clientId: number): Promise<void> {
    await axios.delete(`${this.pathDefault}/${clientId}`);
  }
}