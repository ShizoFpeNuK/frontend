import { Button, Card, Col, List, Row } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import scheduleStore from "../store/ScheduleStoreClass";
import { ISchedule } from "../options/model/schedule.model";
import { useEffect, useState } from "react";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const ListDates = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isOpenTimes, setIsOpenTimes] = useState<boolean>(false);


  const loaderPage = async () => {
    if (orderDetailsStore.OrderDetailsSpecialist) {
      await scheduleStore.getScheduleListBySpecialistId(orderDetailsStore.OrderDetailsSpecialist.employee_id)
        .then(() => {
          setIsLoader(true);
        })
    }
  }

  const onlyOneButtonDisabled = (parentOfButton: any) => {
    const enableButtons = parentOfButton.querySelectorAll(".enroll_list_dates_item_button");
    Array.from(enableButtons).forEach((el: any) => el.disabled = false);
  }


  const onClickButtonDate = (e: any, date: string, schedule: ISchedule) => {
    setIsOpenTimes(!isOpenTimes);
    orderDetailsStore.setOrderDetailsDate(date);
    orderDetailsStore.setOrderDetailsDateWithTimes(schedule);
  }


  const onClickTime = (e: any, time: string) => {
    // const button = e.target.closest(".enroll_list_dates_item_button");
    // onlyOneButtonDisabled(button.parentNode);
    // button.disabled = true;
    orderDetailsStore.setOrderDetailsTime(time);
  }


  useEffect(() => {
    if (!scheduleStore.ScheduleList.length) {
      loaderPage();
    }
  }, [isLoader, isOpenTimes])


  return (
    <Card
      className="enroll_list_dates_times"
      title="Список дат и времени"
      style={CardForm}
      bodyStyle={CardBodyForm}
    >
      <Row className="enroll_list_dates_row">
        <Col className="enroll_list_dates_buttons">
          {scheduleStore.ScheduleList.map((schedule: ISchedule) =>
            <Button
              className="enroll_list_dates_button"
              key={schedule.date}
              onClick={(e) => onClickButtonDate(e, schedule.date, schedule)}
            >
              {schedule.date}
            </Button>
          )}
        </Col>
      </Row>
      <Row className="enroll_list_times_row">
        <div className="enroll_list_times_buttons">
          {orderDetailsStore.OrderDetailsDateWithTimes?.times.map((time: string) =>
            <Button
              className="enroll_list_times_button"
              key={time}
              onClick={(e) => onClickTime(e, time)}
            >
              {time}
            </Button>
          )}
        </div>
      </Row >
    </Card >
  )
};