import { observer } from "mobx-react";
import { ISchedule } from "../options/model/schedule.model";
import { useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import { Button, Card, Col, Row } from "antd";
import scheduleStore from "../store/ScheduleStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const ListDates = observer(() => {

  const getListButtonsDate = () => {
    const listDates = document.querySelector(".enroll_list_dates");
    const ListButtonsTime = listDates!.querySelectorAll(".enroll_list_dates_item_button");
    Array.from(ListButtonsTime).every((el: any) => {
      if (el.getAttribute("data-id") == (orderDetailsStore.OrderDetailsDate)) {
        el.classList.add("button--black");
        return false;
      }

      return true;
    });
  }

  const getListButtonsTime = () => {
    const ListButtonsTime = document.querySelectorAll(".enroll_list_times_button");
    Array.from(ListButtonsTime).every((el: any) => {
      if (el.getAttribute("data-id") == (orderDetailsStore.OrderDetailsTime + orderDetailsStore.OrderDetailsDate)) {
        el.classList.add("button--black");
        return false;
      }

      return true;
    });
  }


  const onlyOneButtonDateDisabled = () => {
    const listDates = document.querySelector(".enroll_list_dates_items")
    const enableButtons = listDates!.querySelectorAll(".enroll_list_dates_item_button");
    Array.from(enableButtons).forEach((el: any) => el.classList.remove("button--black"));
  }

  const onlyOneButtonTimeDisabled = (parentOfButton: any) => {
    if (parentOfButton) {
      const enableButtons = parentOfButton.parentNode.querySelectorAll(".enroll_list_times_button");
      Array.from(enableButtons).forEach((el: any) => el.classList.remove("button--black"));
    }
  }


  const onClickClearChoice = () => {
    orderDetailsStore.deleteOrderDetailsTime();
    const listTimes = document.querySelector(".enroll_list_times_buttons");
    onlyOneButtonTimeDisabled(listTimes);

    orderDetailsStore.deleteOrderDetailsDate();
    onlyOneButtonDateDisabled();

    orderDetailsStore.deleteOrderDetailsDateWithTimes();
  }

  const onClickButtonDate = (e: any, date: string, schedule: ISchedule) => {
    const button = e.target.closest(".enroll_list_dates_item_button");
    const className: string = "button--black";

    if (!button.classList.contains(className)) {
      onlyOneButtonDateDisabled();
      button.classList.add(className);

      orderDetailsStore.setOrderDetailsDate(date);
      orderDetailsStore.deleteOrderDetailsTime();
      orderDetailsStore.setOrderDetailsDateWithTimes(schedule);
    } else {
      button.classList.remove(className);
      orderDetailsStore.deleteOrderDetailsDate();
      orderDetailsStore.setOrderDetailsDateWithTimes(undefined);
    }
  }


  const onClickTime = (e: any, time: string) => {
    const button = e.target.closest(".enroll_list_times_button");
    const className: string = "button--black";

    if (!button.classList.contains(className)) {
      onlyOneButtonTimeDisabled(button.parentNode);
      button.classList.add(className);
      orderDetailsStore.setOrderDetailsTime(time);
    } else {
      button.classList.remove(className);
      orderDetailsStore.deleteOrderDetailsTime();
    }
  }


  useEffect(() => {
    getListButtonsTime();
    getListButtonsDate();
  }, [])


  return (
    <Card
      className="enroll_list_dates_times"
      title={
        <Row className="enroll_list_header">
          <Col span={2}></Col>
          <Col span={20}> Список дат и времени </Col>
          <Col span={2} className="enroll_list_header_buttons">
            <Button
              className="enroll_list_header_button"
              onClick={onClickClearChoice}
              shape="circle"
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      }
      style={CardForm}
      bodyStyle={{paddingTop: 0, ...CardBodyForm}}
      loading={Boolean(!scheduleStore.ScheduleList.length)}
    >
      {scheduleStore.ScheduleList.length !== 0 &&
        <div className="enroll_list_dates_items">
          {scheduleStore.ScheduleMonth.map((month: string) =>
            <div className="enroll_list_dates_item" key={month}>
              <div className="enroll_list_dates_item_month">
                {month.charAt(0).toUpperCase() + month.substring(1)}
              </div>
              <div className="enroll_list_dates_item_buttons">
                {scheduleStore.ScheduleList.filter((schedule: ISchedule) => {
                  return month === new Date(schedule.date).toLocaleString('ru', { month: 'long' });
                }).map((schedule: ISchedule) =>
                  <Button
                    className="enroll_list_dates_item_button"
                    key={schedule.date}
                    data-id={schedule.date}
                    shape="circle"
                    onClick={(e) => onClickButtonDate(e, schedule.date, schedule)}
                  >
                    {new Date(schedule.date).getDate()}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      }

      {orderDetailsStore.OrderDetailsDateWithTimes !== undefined &&
        <div className="enroll_list_times_buttons">
          {orderDetailsStore.OrderDetailsDateWithTimes?.times.map((time: string) =>
            <Button
              className="enroll_list_times_button"
              key={time + orderDetailsStore.OrderDetailsDateWithTimes?.date}
              data-id={time + orderDetailsStore.OrderDetailsDateWithTimes?.date}
              onClick={(e) => onClickTime(e, time)}
            >
              {time}
            </Button>
          )}
        </div >
      }

    </Card >
  )
});