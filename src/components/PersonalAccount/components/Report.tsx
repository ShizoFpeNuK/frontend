import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import { IReportEstablishments, IReportServices, IReportSpecialists } from "../../../options/model/report.model";
import dayjs from "dayjs";
import FormReport from "../forms/FormReport";
import ButtonStep from "../../Buttons/ButtonStep";
import ReportServices from "../../../services/report.service";
import ReportPAStoreClass from "../../../store/paStore/ReportPAStoreClass";
import TableReportServices from "../tables/TableReportServices";
import TableReportSpecialists from "../tables/TableReportSpecialists";
import TableReportEstablishments from "../tables/TableReportEstablishments";


const reportStore = new ReportPAStoreClass();

interface fieldValue {
  duration: {
    start_date: dayjs.Dayjs,
    end_date: dayjs.Dayjs,
  }
}


const Report = observer(() => {
  const [formServicesReport] = useForm();
  const [formSpecialistsReport] = useForm();
  const [formEstablishmentsReport] = useForm();
  const [isOpenServicesReport, setIsOpenServicesReport] = useState<boolean>(false);
  const [isOpenSpecialistsReport, setIsOpenSpecialistsReport] = useState<boolean>(false);
  const [isOpenEstablishmentsReport, setIsOpenEstablishmnetReport] = useState<boolean>(false);


  const onClickServicesButton = () => {
    setIsOpenSpecialistsReport(false);
    setIsOpenEstablishmnetReport(false);
    setIsOpenServicesReport(true);
  }

  const onClickEmployeesButton = () => {
    setIsOpenServicesReport(false);
    setIsOpenEstablishmnetReport(false);
    setIsOpenSpecialistsReport(true);
  }

  const onClickEstablishmentsButton = () => {
    setIsOpenServicesReport(false);
    setIsOpenSpecialistsReport(false);
    setIsOpenEstablishmnetReport(true);
  }


  const cancelServicesReport = () => {
    reportStore.deleteReportServices();
    setIsOpenServicesReport(false);
  }

  const cancelSpecialistsReport = () => {
    reportStore.deleteReportSpecialists();
    setIsOpenSpecialistsReport(false);
  }

  const cancelEstablishmentsReport = () => {
    reportStore.deleteReportEstablishments();
    setIsOpenEstablishmnetReport(false);
  }



  const onFinishServicesReport = async (value: fieldValue) => {
    const correctValue: { start_date: string, end_date: string } = {
      "start_date": value["duration"].start_date.format("YYYY-MM-DD"),
      "end_date": value["duration"].end_date.format("YYYY-MM-DD"),
    }

    await ReportServices.getReportServices(correctValue)
      .then((report: IReportServices[]) => {
        reportStore.setReportServices(report);
        formServicesReport.resetFields();
      })
  }

  const onFinishSpecialistsReport = async (value: fieldValue) => {
    const correctValue: { start_date: string, end_date: string } = {
      "start_date": value["duration"].start_date.format("YYYY-MM-DD"),
      "end_date": value["duration"].end_date.format("YYYY-MM-DD"),
    }

    await ReportServices.getReportSpecialists(correctValue)
      .then((report: IReportSpecialists[]) => {
        reportStore.setReportSpecialists(report);
        formSpecialistsReport.resetFields();
      })
  }

  const onFinishEstablishmentsReport = async (value: fieldValue) => {
    const correctValue: { start_date: string, end_date: string } = {
      "start_date": value["duration"].start_date.format("YYYY-MM-DD"),
      "end_date": value["duration"].end_date.format("YYYY-MM-DD"),
    }

    await ReportServices.getReportEstablishments(correctValue)
      .then((report: IReportEstablishments[]) => {
        reportStore.setReportEstablishments(report);
        formEstablishmentsReport.resetFields();
      })
  }


  useEffect(() => {
    return () => {
      reportStore.deleteReportServices();
      reportStore.deleteReportSpecialists();
      reportStore.deleteReportEstablishments();
    }
  }, [])


  return (
    <div className="report">
      <h2 className="report_title title--border"> Получить отчёт </h2>
      <Row
        justify={'space-between'}
        className="report_row"
      >
        <Col
          span={6}
          style={{ paddingRight: "20px" }}
        >
          {!isOpenServicesReport && !isOpenSpecialistsReport && !isOpenEstablishmentsReport &&
            <Space
              className="report_control_buttons"
              direction="vertical"
              style={{ width: "100%" }}>
              <Button block onClick={onClickServicesButton}> <SearchOutlined /> Услуги </Button>
              <Button block onClick={onClickEmployeesButton}> <SearchOutlined /> Специалисты </Button>
              <Button block onClick={onClickEstablishmentsButton}> <SearchOutlined /> Заведения </Button>
            </Space>
          }
          {isOpenServicesReport &&
            <FormReport
              form={formServicesReport}
              title="Отчёт по услугам"
              onFinish={onFinishServicesReport}
              buttons={<ButtonStep block onClick={cancelServicesReport}> Назад </ButtonStep>}
            />
          }
          {isOpenSpecialistsReport &&
            <FormReport
              form={formSpecialistsReport}
              title="Отчёт по специалистам"
              onFinish={onFinishSpecialistsReport}
              buttons={<ButtonStep block onClick={cancelSpecialistsReport}> Назад </ButtonStep>}
            />
          }
          {isOpenEstablishmentsReport &&
            <FormReport
              form={formEstablishmentsReport}
              title="Отчёт по заведениям"
              onFinish={onFinishEstablishmentsReport}
              buttons={<ButtonStep block onClick={cancelEstablishmentsReport}> Назад </ButtonStep>}
            />
          }
        </Col>
        <Col
          span={18}
          style={{ paddingLeft: "20px" }}
        >
          {reportStore.reportServices.length !== 0 &&
            <>
              <h2 className="title--border"> Отчёт об услугах </h2>
              <TableReportServices services={reportStore.reportServices} />
            </>
          }
          {reportStore.reportSpecialists.length !== 0 &&
            <>
              <h2 className="title--border"> Отчёт о сотрудниках </h2>
              <TableReportSpecialists specialists={reportStore.reportSpecialists} />
            </>
          }
          {reportStore.reportEstablishments.length !== 0 &&
            <>
              <h2 className="title--border"> Отчёт о заведениях </h2>
              <TableReportEstablishments establishments={reportStore.reportEstablishments} />
            </>
          }
        </Col>
      </Row>
    </div>
  )
});


export default Report;