import { observer } from "mobx-react";
import { IService } from "../options/model/service.model";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import { Card, Row, Col, Button, Space } from "antd";
import enrollStore from "../store/EnrollStoreClass";
import OrderServices from "../services/order.service";
import scheduleStore from "../store/ScheduleStoreClass";
import servicesStore from "../store/ServicesStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const OrderDetails = observer(() => {

  //new
  const selectedClient = async () => {
    enrollStore.setSelectButtonClientIsClicked(true);
    enrollStore.setIsOpenFormFindClient(false);
    enrollStore.setIsOpenListSpecialist(true);
  }

  //new
  const cancelClient = async () => {
    orderDetailsStore.deleteOrderDetailsClient();
    enrollStore.setSelectButtonClientIsClicked(false);
    enrollStore.setIsOpenListSpecialist(false);
    enrollStore.setIsOpenFormFindClient(true);
  }

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
    await OrderServices.postOrder(orderDetailsStore.getOrderDetails());
    enrollStore.setSelectButtonDateIsClicked(false);
    enrollStore.setSelectButtonServicesIsClicked(false);
    enrollStore.setSelectButtonSpecialistIsClicked(false);
    enrollStore.setSelectButtonClientIsClicked(false); //new
    orderDetailsStore.clearStore();
    enrollStore.setIsSubmitOrder(false);
    // enrollStore.setIsOpenListSpecialist(true);
    enrollStore.setIsOpenFormFindClient(true);
  }

  //new
  const onClickClearAll = () => {
    enrollStore.setSelectButtonDateIsClicked(false);
    enrollStore.setSelectButtonServicesIsClicked(false);
    enrollStore.setSelectButtonSpecialistIsClicked(false);
    enrollStore.setSelectButtonClientIsClicked(false);
    enrollStore.setIsOpenListDate(false);
    enrollStore.setIsOpenListServices(false);
    enrollStore.setIsOpenListSpecialist(false);
    enrollStore.setIsOpenFormFindClient(false);
    orderDetailsStore.clearStore();
    enrollStore.setIsOpenFormFindClient(true);
  }


  return (
    <Card title="Детали записи" style={CardForm} bodyStyle={{ textAlign: "left", ...CardBodyForm, paddingBottom: "10px" }}>
      {/* new */}
      {orderDetailsStore.OrderDetailsClient
        ? <div className="enroll_order_details_client">
          <h3 className="enroll_order_details_client_title"> Клиент </h3>
          <div className="enroll_order_details_client_fullname"> {orderDetailsStore.OrderDetailsClient?.full_name} </div>
          <div className="enroll_order_details_client_telephone"> {orderDetailsStore.OrderDetailsClient?.telephone} </div>
        </div>
        : <div className="enroll_order_details_message"> Ожидаем ваш заказ! </div>
      }

      {/* new */}
      {orderDetailsStore.OrderDetailsSpecialist &&
        <div className="enroll_order_details_specialist">
          <h3 className="enroll_order_details_specialist_title"> Специалист </h3>
          <div className="enroll_order_details_specialist_fullname"> {orderDetailsStore.OrderDetailsSpecialist?.full_name} </div>
        </div>
      }

      {/* {Boolean(orderDetailsStore.OrderDetailsSpecialist)
        ? <div className="enroll_order_details_specialist"> {orderDetailsStore.OrderDetailsSpecialist?.full_name} </div>
        : <div className="enroll_order_details_message"> Ожидаем ваш заказ! </div>
      } */}

      {orderDetailsStore.OrderDetailsServices.length !== 0 &&
        <div className="enroll_order_details_services">
          {orderDetailsStore.OrderDetailsServices.map((service: IService) =>
            <Row wrap={false} className="enroll_order_details_service" key={service.service_id}>
              <Col className="enroll_order_details_service_info">
                <div className="enroll_order_details_service_info_name"> {service.name_service} </div>
              </Col>
              <Col className="enroll_order_details_info">
                <div className="enroll_order_details_info_cost"> {service.cost} руб. </div>
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


      {/* Кнопка после клиента */}
      {orderDetailsStore.OrderDetailsClient && !enrollStore.selectButtonClientIsClicked &&
        <div className="enroll_order_details_next_step">
          <Button
            className="enroll_order_details_next_step_button"
            type="primary"
            onClick={selectedClient}
          >
            Далее
          </Button>
        </div>
      }
      {enrollStore.selectButtonClientIsClicked && !orderDetailsStore.OrderDetailsSpecialist &&
        <div className="enroll_order_details_next_step">
          <Button
            className="enroll_order_details_next_step_button"
            type="primary"
            onClick={cancelClient}
          >
            Назад
          </Button>
        </div>
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

      {/* Кнопки очистки и submit */}
      <Space direction="vertical" className="enroll_order_details_buttons" style={{width: "100%"}}>
        {enrollStore.selectButtonDateIsClicked &&
          <Button
            className="enroll_order_details_submit_button"
            type="primary"
            onClick={onClickSubmit}
          >
            Записаться
          </Button>
        }
        {orderDetailsStore.OrderDetailsSpecialist &&
          <Button
            className="enroll_order_details_clear_button"
            danger
            onClick={onClickClearAll}
          >
            Всё очистить
          </Button>
        }
      </Space>
    </Card >
  )
});