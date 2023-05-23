import { IReportEstablishments, IReportServices, IReportSpecialists } from "../options/model/report.model";
import axios from "axios";


interface Duration {
  start_date: string,
  end_date: string,
}


export default class ReportServices {
  static pathDefault: string = "/report";


  static async getReportServices(duration: Duration): Promise<IReportServices[]> {
    const report = await axios.post(`/services${this.pathDefault}`, {
      start_date: duration.start_date,
      end_date: duration.end_date,
    });

    return report.data;
  }

  static async getReportSpecialists(duration: Duration): Promise<IReportSpecialists[]> {
    const report = await axios.post(`/specialists${this.pathDefault}`, {
      start_date: duration.start_date,
      end_date: duration.end_date,
    });

    return report.data;
  }

  static async getReportEstablishments(duration: Duration): Promise<IReportEstablishments[]> {
    const report = await axios.post(`/establishments${this.pathDefault}`, {
      start_date: duration.start_date,
      end_date: duration.end_date,
    });

    return report.data;
  }
}