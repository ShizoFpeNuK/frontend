import { observer } from "mobx-react";
import { ISchedule } from "../options/model/schedule.model";
import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import scheduleStore from "../store/ScheduleStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const ListDates = observer(() => {
  const [isLoader, setIsLoader] = useState<boolean>(false);


  const loaderPage = async () => {
    if (orderDetailsStore.OrderDetailsSpecialist) {
      // await scheduleStore.getScheduleListBySpecialistId(orderDetailsStore.OrderDetailsSpecialist.employee_id)
      //   .then(() => {
      //     setIsLoader(true);
      //   })
    }
  }


  const getListButtonsDate = () => {
    const ListButtonsTime = document.querySelectorAll(".enroll_list_dates_button");
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


  const onlyOneButtonDateDisabled = (parentOfButton: any) => {
    const enableButtons = parentOfButton.querySelectorAll(".enroll_list_dates_button");
    Array.from(enableButtons).forEach((el: any) => el.classList.remove("button--black"));
  }

  const onlyOneButtonTimeDisabled = (parentOfButton: any) => {
    const enableButtons = parentOfButton.querySelectorAll(".enroll_list_times_button");
    Array.from(enableButtons).forEach((el: any) => el.classList.remove("button--black"));
  }


  const onClickButtonDate = (e: any, date: string, schedule: ISchedule) => {
    const button = e.target.closest(".enroll_list_dates_button");
    const className: string = "button--black";

    if (!button.classList.contains(className)) {
      onlyOneButtonDateDisabled(button.parentNode);
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
    if (!scheduleStore.ScheduleList.length) {
      loaderPage();
    } else {
      getListButtonsTime();
      getListButtonsDate();
    }
  }, [isLoader])


  return (
    <Card
      className="enroll_list_dates_times"
      title="Список дат и времени"
      style={CardForm}
      bodyStyle={CardBodyForm}
    >

      {scheduleStore.ScheduleList.length !== 0 &&
        <div className="enroll_list_dates_buttons">
          {scheduleStore.ScheduleList.map((schedule: ISchedule) =>
            <Button
              className="enroll_list_dates_button"
              key={schedule.date}
              data-id={schedule.date}
              onClick={(e) => onClickButtonDate(e, schedule.date, schedule)}
            >
              {schedule.date}
            </Button>
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