import { IEmployee, IEmployeeBase, IEmployeeCreate, IEmployeeUpdate } from "../options/model/employee.model";
import axios from "axios";


export default class EmployeeServices {
  static pathDefault: string = "/employees";


  static async getAll(): Promise<IEmployee[]> {
    const employees = await axios.get(this.pathDefault);

    return employees.data;
  }

  static async getEmployeeByTelephone(employeeBase: IEmployeeBase): Promise<IEmployee> {
    const employee = await axios.post(`${this.pathDefault}/info`, employeeBase);

    return employee.data;
  }

  static async getEmployee(employeeId: number): Promise<IEmployee> {
    const employees = await axios.get(`${this.pathDefault}/${employeeId}`);

    return employees.data;
  }

  static async createEmployee(employeeAdd: IEmployeeCreate): Promise<void> {
    await axios.post(this.pathDefault, employeeAdd);
  }

  static async updateEmployee(employeeId: number, employeeUpdate: IEmployeeUpdate): Promise<void> {
    await axios.put(`${this.pathDefault}/${employeeId}`, employeeUpdate);
  }

  static async deleteEmployee(employeeId: number): Promise<void> {
    await axios.delete(`${this.pathDefault}/${employeeId}`);
  }
}