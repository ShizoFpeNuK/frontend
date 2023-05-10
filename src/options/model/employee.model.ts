

export interface IEmployeeBase {
  employee_id: number
  full_name: string,
  telephone: string,
}

export interface IEmployeeCreate extends IEmployeeBase {
  email: string,
  experience: number,
  salary: number,
  brief_info: string,
  age: number,
  post: string,
}

export interface IEmployee extends IEmployeeCreate {
  rating: number,
}

export interface IEmployeeUpdate {
  full_name: string,
  telephone: string,
  email: string | undefined,
  experience: number,
  salary: number,
  brief_info: string | undefined,
  age: number,
  post: string,
}