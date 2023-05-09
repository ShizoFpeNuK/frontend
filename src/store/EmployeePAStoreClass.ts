import { IEmployee } from "../options/model/employee.model";
import { makeAutoObservable } from "mobx";


class EmployeePAStoreClass {
  employees: IEmployee[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setEmployee(employees: IEmployee[]) {
    this.employees = employees;
  }

  deleteEmployee() {
    this.setEmployee([]);
  }
}


export default EmployeePAStoreClass;