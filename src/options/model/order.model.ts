

export interface OrderBase {
  employee_id: number, 
  services_id: number[], 
}

export interface Order extends OrderBase {
  client_id: number,
  date: string, 
  time: string,
}
