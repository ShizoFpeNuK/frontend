import { IClient, IClientCreate, IClientBase, ClientUpdate } from "../options/model/client.model";
import axios from "axios";


export default class ClientServices {
  static pathDefault: string = "/clients";


  static async getClientByTelephone(clientBase: IClientBase): Promise<IClient> {
    const client = await axios.post(this.pathDefault + "/info", clientBase);
    
    return client.data;
  }

  static async getClientById(clientId: number): Promise<IClient> {
    const client = await axios.get(this.pathDefault + "/" + clientId);

    return client.data;
  }

  static async createClient(clientAdd: IClientCreate): Promise<void> {
    await axios.post(this.pathDefault, clientAdd);
  }

  static async updateClient(clientId: number, clientUpdate: ClientUpdate): Promise<void> {
    await axios.patch(this.pathDefault + "/" + clientId, {
      full_name: clientUpdate.full_name,
      telephone: clientUpdate.telephone,
      email: clientUpdate.email,
    });
  }

  static async deleteClient(clientId: number): Promise<void> {
    await axios.delete(this.pathDefault + "/" + clientId);
  }
}