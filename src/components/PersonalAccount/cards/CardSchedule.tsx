import '../../../style/css/cards/cardSchedule.css';
import { Card } from "antd";
import { IScheduleWorker } from "../../../options/model/schedule.model";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";


interface CardScheduleProps {
  schedule: IScheduleWorker,
}


const CardSchedule = ({ schedule }: CardScheduleProps) => {
  return (
    <Card
      className="card_schedule"
      style={CardForm}
      bodyStyle={CardBodyForm}
    >
      <div className="card_schedule_info">
        <div className="card_schedule_info_inner" >
          <h3 className="card_schedule_info_inner_title"> Дата работы </h3>
          <p className="card_schedule_info_inner_date"> {schedule.date_work} </p>
        </div>
        <div className="card_schedule_info_inner">
          <h3 className="card_schedule_info_inner_title"> Рабочий день </h3>
          <p className="card_schedule_info_inner_duration_day"> {schedule.date_work} — {schedule.end_work}</p>
        </div>
        <div className="card_schedule_info_inner">
          <h3 className="card_schedule_info_inner_title"> Адрес работы </h3>
          <p className="card_schedule_info_inner_address"> {schedule.address_establishment} </p>
        </div>
      </div>
    </Card>
  )
};


export default CardSchedule;