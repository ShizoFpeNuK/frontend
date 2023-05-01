import { observer } from "mobx-react";
import { IService } from "../options/model/service.model";
import { Card, Row, Col, Button } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import enrollStore from "../store/EnrollStoreClass";
import scheduleStore from "../store/ScheduleStoreClass";
import servicesStore from "../store/ServicesStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const OrderDetails = observer(() => {

  const selectedSpecialist = async () => {
    enrollStore.setSelectButtonSpecialistIsClicked(true);
    enrollStore.setIsOpenListSpecialist(false);
    enrollStore.setIsOpenListServices(true);
    await servicesStore.getServicesListBySpecialistId(orderDetailsStore.OrderDetailsSpecialist!.employee_id);
  }

  const cancelSpecialist = () => {
    servicesStore.setServicesList([]);
    enrollStore.setSelectButtonSpecialistIsClicked(false);
    enrollStore.setIsOpenListServices(false);
    enrollStore.setIsOpenListSpecialist(true);
  }

  const selectedServices = async () => {
    enrollStore.setSelectButtonServicesIsClicked(true);
    enrollStore.setIsOpenListServices(false);
    enrollStore.setIsOpenListDate(true);
    await scheduleStore.getScheduleListBySpecialistId({
    employee_id: orderDetailsStore.OrderDetailsSpecialist!.employee_id,
    services_id: orderDetailsStore.getOrderDetailServicesId(),
    })
  }

  const cancelServices = () => {
    enrollStore.setSelectButtonServicesIsClicked(false);
    enrollStore.setIsOpenListDate(false);
    enrollStore.setIsOpenListServices(true);
  }

  const selectedDate = async () => {
    enrollStore.setSelectButtonDateIsClicked(true);
    enrollStore.setIsOpenListDate(false);
    enrollStore.setIsSubmitOrder(true);
  }

  const cancelDate = () => {
    enrollStore.setSelectButtonDateIsClicked(false);
    enrollStore.setIsOpenListDate(true);
    enrollStore.setIsSubmitOrder(false);
  }


  const onClickSubmit = async () => {
    // await OrderServices.postOrder(orderDetailsStore.getOrderDetails());
    enrollStore.setSelectButtonDateIsClicked(false);
    enrollStore.setSelectButtonServicesIsClicked(false);
    enrollStore.setSelectButtonSpecialistIsClicked(false);
    orderDetailsStore.clearStore();
    enrollStore.setIsSubmitOrder(false);
    enrollStore.setIsOpenListSpecialist(true);
  }


  return (
    <Card title="Детали записи" style={CardForm} bodyStyle={{ textAlign: "left", ...CardBodyForm }}>
      {Boolean(orderDetailsStore.OrderDetailsSpecialist)
        ? <div className="enroll_order_details_specialist"> {orderDetailsStore.OrderDetailsSpecialist?.full_name} </div>
        : <div className="enroll_order_details_message"> Ожидаем ваш заказ! </div>
      }

      {orderDetailsStore.OrderDetailsServices.length !== 0 &&
        <div className="enroll_order_details_services">
          {orderDetailsStore.OrderDetailsServices.map((service: IService) =>
            <Row className="enroll_order_details_service" key={service.service_id}>
              <Col className="enroll_order_details_services_info">
                <span className="enroll_order_details_services_info_name"> {service.name_service} </span>
              </Col>
              <Col className="enroll_order_details_item_meta_info">
                <span className="enroll_order_details_services_info_cost"> {service.cost} руб. </span>
              </Col>
            </Row>
          )}
        </div>
      }

      {orderDetailsStore.OrderDetailsDate.length !== 0 && orderDetailsStore.OrderDetailsTime.length !== 0 &&
        <Row className="enroll_order_details_datetime">
          <Col className="enroll_order_details_date"> {new Date(orderDetailsStore.OrderDetailsDate).toLocaleDateString()} </Col>
          <Col className="enroll_order_details_time"> {orderDetailsStore.OrderDetailsTime} — {orderDetailsStore.getOrderDetailsTotalTime} </Col>
        </Row>
      }

      {orderDetailsStore.OrderDetailsServices.length !== 0 &&
        <Row className="enroll_order_details_totalcount">
          <Col className="enroll_order_details_totalcount_text"> Стоимость </Col>
          <Col className="enroll_order_details_totalcount_sum"> {orderDetailsStore.getOrderDetailsTotalCount} руб. </Col>
        </Row>
      }


      {/* Кнопка после специалиста */}
      {orderDetailsStore.OrderDetailsSpecialist && !enrollStore.selectButtonSpecialistIsClicked &&
        <div className="enroll_order_details_next_step">
          <Button
            className="enroll_order_details_next_step_button"
            type="primary"
            onClick={selectedSpecialist}
          >
            Далее
          </Button>
        </div>
      }
      {enrollStore.selectButtonSpecialistIsClicked && orderDetailsStore.OrderDetailsServices.length === 0 &&
        <div className="enroll_order_details_next_step">
          <Button
            className="enroll_order_details_next_step_button"
            type="primary"
            onClick={cancelSpecialist}
          >
            Назад
          </Button>
        </div>
      }


      {/* Кнопка после услуг */}
      {enrollStore.IsNextServices && !enrollStore.selectButtonServicesIsClicked &&
        <div className="enroll_order_details_next_step">
          <Button
            className="enroll_order_details_next_step_button"
            type="primary"
            onClick={selectedServices}
          >
            Далее
          </Button>
        </div>
      }
      {enrollStore.selectButtonServicesIsClicked && orderDetailsStore.OrderDetailsDate.length === 0 &&
        <div className="enroll_order_details_next_step">
          <Button
            className="enroll_order_details_next_step_button"
            type="primary"
            onClick={cancelServices}
          >
            Назад
          </Button>
        </div>
      }


      {/* Кнопка после даты */}
      {enrollStore.IsNextDates && !enrollStore.selectButtonDateIsClicked &&
        <div className="enroll_order_details_next_step">
          <Button
            className="enroll_order_details_next_step_button"
            type="primary"
            onClick={selectedDate}
          >
            Далее
          </Button>
        </div>
      }
      {enrollStore.selectButtonDateIsClicked &&
        <div className="enroll_order_details_next_step">
          <Button
            className="enroll_order_details_next_step_button"
            type="primary"
            onClick={cancelDate}
          >
            Назад
          </Button>
        </div>
      }


      {enrollStore.selectButtonDateIsClicked &&
        <div className="enroll_order_details_submit">
          <Button
            className="enroll_order_details_submit_button"
            type="primary"
            onClick={onClickSubmit}
          >
            Записаться
          </Button>
        </div>
      }
    </Card >
  )
});