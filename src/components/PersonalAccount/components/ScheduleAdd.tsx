import { observer } from "mobx-react";
import { Col, Row } from "antd";
import ResultSuccess from "../../Results/ResultSuccess";
import FormScheduleAdd from "../forms/FormScheduleAdd";
import ResultErrorConflict from "../../Results/ResultErrorConflict";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface ScheduleAddProps {
  notificationsStore?: NotificationsPAStoreClass,
}


const ScheduleAdd = observer(({ notificationsStore }: ScheduleAddProps) => {
  return (
    <div className="schedule_add">
      <h2 className="schedule_add_title title--border"> Добавить расписание </h2>
      <Row
        justify={'space-between'}
        className="schedule_add_row"
      >
        <Col
          className="schedule_add_form"
          span={6}
          style={{ paddingRight: "20px" }}
        >
          <FormScheduleAdd notificationsStore={notificationsStore} />
        </Col>
        <Col className="schedule_add_result" span={6}>
          {notificationsStore?.isCreateSchedule &&
            <ResultSuccess title="Сотрудник успешно создан!" />
          }
          {notificationsStore?.isConflictSchedule &&
            <ResultErrorConflict title="Такой сотрудник уже создан!" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default ScheduleAdd;