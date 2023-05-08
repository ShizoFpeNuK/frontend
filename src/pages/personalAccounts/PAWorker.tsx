import '../../style/css/personal_account/paWorker.css';
import { observer } from "mobx-react";
import { SearchOutlined } from "@ant-design/icons";
import { IScheduleWorker } from "../../options/model/schedule.model";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import CardSchedule from "../../components/PersonalAccount/cards/CardSchedule";
import ScheduleServices from "../../services/schedule.service";
import SchedulePAStoreClass from "../../store/SchedulePAStoreClass";


const scheduleStore = new SchedulePAStoreClass();

interface PAWorkerProps {
  workerId: number,
}


const PAWorker = observer(({workerId}: PAWorkerProps) => {
  const [isLoader, setIsLoader] = useState<boolean>(false);


  const loadingPage = async () => {
    await ScheduleServices.getScheduleByEmployeeId(14) //workerId
      .then(() => {
        setIsLoader(true);
      })
    //Обработка ошибки
  }

  const onClickFoundScheduleButton = () => {

  }


  useEffect(() => {
    if (!isLoader) {
      // loadingPage();
    }
  }, [isLoader])


  return (
    <div className="personal_account_worker_page">
      <h1 className="personal_account_worker_title title--border"> Личный кабинет </h1>
      <Row className="personal_account_worker_row">
        <Col className="personal_account_worker_info" span={4}>
          <CardPAUser />
          <Button
            className="personal_account_worker_info_button"
            block
            onClick={onClickFoundScheduleButton}
          >
            <SearchOutlined /> Посмотреть расписание
          </Button>
        </Col>

        <Col
          className="personal_account_worker_schedule"
          span={20}
        >
          {scheduleStore.schedule.map((schedule: IScheduleWorker) =>
            <CardSchedule schedule={schedule} />
          )}
        </Col>
      </Row>
    </div>
  )
});


export default PAWorker;