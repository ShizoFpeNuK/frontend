import { ICheck } from "../../options/model/check.model";
import { makeAutoObservable } from "mobx";
import { IReportEstablishments, IReportServices, IReportSpecialists } from "../../options/model/report.model";


class ReportPAStoreClass {
  reportServices: IReportServices[] = [];
  reportSpecialists: IReportSpecialists[] = [];
  reportEstablishments: IReportEstablishments[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  setReportServices(report: IReportServices[]) {
    this.reportServices = report;
  }

  setReportSpecialists(report: IReportSpecialists[]) {
    this.reportSpecialists = report;
  }
  setReportEstablishments(report: IReportEstablishments[]) {
    this.reportEstablishments = report;
  }


  deleteReportServices() {
    this.setReportServices([]);
  }

  deleteReportSpecialists() {
    this.setReportSpecialists([]);
  }

  deleteReportEstablishments() {
    this.setReportEstablishments([]);
  }
};


export default ReportPAStoreClass;