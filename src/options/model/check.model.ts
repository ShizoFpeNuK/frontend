import { IService } from "./service.model";


export interface ICheck {
  check_id: number,
  date_check: string,
  total_cost: number,
  start_time: string,
  end_time: string,
  paid: boolean,
  full_name: string,
  post: string,
  address_establishment: string,
}

export interface ICheckDetails {
  services: IService[],
}