

export interface ISchedule {
  date: string,
  times: string[],
}

export interface IScheduleWorker {
  schedule_id: number,
  date_work: string,
  start_work: string,
  end_work: string,
  address_establishment: string,
}
