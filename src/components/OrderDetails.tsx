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
    await servicesStore.getServicesListBySpecialistId(orderDetailsStore.OrderDetailsSpecialist!.employee_id);
    enrollStore.setEnrollIsDisabledButtonServices(false);
    enrollStore.setSelectButtonSpecialistIsClicked(true);
    console.log("Далее услуги");
  }

  const cancelSpecialist = () => {
    servicesStore.setServicesList([]);
    enrollStore.setEnrollIsDisabledButtonServices(true);
    enrollStore.setSelectButtonSpecialistIsClicked(false);
    console.log("Отмена услуги");
  }

  const selectedServices = async () => {
    await scheduleStore.getScheduleListBySpecialistId(orderDetailsStore.OrderDetailsSpecialist!.employee_id)
    enrollStore.setEnrollIsDisabledButtonServices(true);
    enrollStore.setEnrollIsDisabledButtonDates(false);
    enrollStore.setSelectButtonServicesIsClicked(true);
    console.log("Далее даты");
  }

  const cancelServices = () => {
    enrollStore.setEnrollIsDisabledButtonServices(false);
    enrollStore.setEnrollIsDisabledButtonDates(true);
    enrollStore.setSelectButtonServicesIsClicked(false);
    console.log("Отмена даты");
  }

  const selectedDate = async () => {
    enrollStore.setEnrollIsDisabledButtonDates(true);
    enrollStore.setSelectButtonDateIsClicked(true);
    console.log("Далее заказ");
  }

  const cancelDate = () => {
    enrollStore.setEnrollIsDisabledButtonDates(false);
    enrollStore.setSelectButtonDateIsClicked(false);
    console.log("Отмена заказа");
  }


  const onClickSubmit = async () => {
    // await OrderServices.postOrder(orderDetailsStore.getOrderDetails());
    enrollStore.setSelectButtonDateIsClicked(false);
    enrollStore.setSelectButtonServicesIsClicked(false);
    enrollStore.setSelectButtonSpecialistIsClicked(false);
    orderDetailsStore.clearStore();
  }


  return (
    <Card title="Детали записи" style={CardForm} bodyStyle={{ textAlign: "left", ...CardBodyForm }}>
      {Boolean(orderDetailsStore.OrderDetailsSpecialist) &&
        <div className="enroll_order_details_specialist"> {orderDetailsStore.OrderDetailsSpecialist?.full_name} </div>
      }

      {orderDetailsStore.OrderDetailsServices.length !== 0 &&
        <div className="enroll_order_details_services">
          {orderDetailsStore.OrderDetailsServices.map((service: IService) =>
            <Row className="enroll_order_details_service" key={service.service_id}>
              <Col className="enroll_order_details_services_info">
                <span className="enroll_order_details_services_info_name">{service.name_service}</span>
              </Col>
              <Col className="enroll_order_details_item_meta_info">
                <span className="enroll_order_details_services_info_cost">{service.cost}</span>
              </Col>
            </Row>
          )}
        </div>
      }

      {orderDetailsStore.OrderDetailsDate.length !== 0 &&
        <Row className="enroll_order_details_datetime">
          <Col className="enroll_order_details_date"> {orderDetailsStore.OrderDetailsDate} </Col>
          <Col className="enroll_order_details_time"> {orderDetailsStore.OrderDetailsTime} </Col>
        </Row>
      }

      {orderDetailsStore.OrderDetailsServices.length !== 0 &&
        <Row className="enroll_order_details_totalcount">
          <Col className="enroll_order_details_totalcount_text"> Стоимость </Col>
          <Col className="enroll_order_details_totalcount_sum"> {orderDetailsStore.getOrderDetailsTotalCount} </Col>
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