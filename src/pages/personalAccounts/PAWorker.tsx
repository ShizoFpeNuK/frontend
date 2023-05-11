import '../../style/css/personal_account/paWorker.css';
import { observer } from "mobx-react";
import { SearchOutlined } from "@ant-design/icons";
import { IScheduleWorker } from "../../options/model/schedule.model";
import { useEffect, useState } from "react";
import { Button, Col, Row, Space } from "antd";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import CardScheduleWorker from "../../components/PersonalAccount/cards/CardScheduleWorker";
import ScheduleWorkerPAStoreClass from "../../store/paStore/ScheduleWorkerPAStoreClass";


const scheduleStore = new ScheduleWorkerPAStoreClass();

interface PAWorkerProps {
  workerId: number,
}


const PAWorker = observer(({ workerId }: PAWorkerProps) => {
  const [isLoader, setIsLoader] = useState<boolean>(false);


  const loadingPage = async () => {
    await scheduleStore.getScheduleByEmployeeId(2) //workerId
      .then(() => {
        setIsLoader(true);
      })
    //Обработка ошибки
  }

  const onClickFoundScheduleButton = async () => {
    await scheduleStore.getScheduleByEmployeeId(2); //workerId
  }


  useEffect(() => {
    if (!isLoader) {
      loadingPage();
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
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {scheduleStore.schedule.map((schedule: IScheduleWorker) =>
              <CardScheduleWorker schedule={schedule} />
            )}
          </Space>
        </Col>
      </Row>
    </div>
  )
});


export default PAWorker;