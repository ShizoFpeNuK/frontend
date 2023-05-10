import { IEmployee } from "../../options/model/employee.model";
import { makeAutoObservable } from "mobx";


class EmployeePAStoreClass {
  employees: IEmployee[] = [];
  employee: IEmployee | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setEmployees(employees: IEmployee[]) {
    this.employees = employees;
  }

  setEmployee(employee: IEmployee | undefined) {
    this.employee = employee;
  }

  deleteEmployees() {
    this.setEmployees([]);
  }

  deleteEmployee() {
    this.setEmployee(undefined);
  }
}


export default EmployeePAStoreClass;