import '../../style/css/order/orderDetails.css';
import { observer } from "mobx-react";
import { IService } from "../../options/model/service.model";
import { IClient, IClientBase } from "../../options/model/client.model";
import { CardBodyForm, CardForm } from "../../style/typescript/cardForm";
import { Card, Row, Col, Button, Space } from "antd";
import ButtonStep from "../Buttons/ButtonStep";
import enrollStore from "../../store/EnrollStoreClass";
import CheckServices from "../../services/check.service";
import scheduleStore from "../../store/ScheduleStoreClass";
import servicesStore from "../../store/ServicesStoreClass";
import specialistsStore from "../../store/SpecialistsStoreClass";
import orderDetailsStore from "../../store/OrderDetailsStoreClass";
import notificationsStore from "../../store/NotificationsStoreClass";


interface OrderDetailsProps {
  notifications?: boolean,
  client: IClientBase | IClient,
  deleteClient: () => void,
}


const OrderDetails = observer((props: OrderDetailsProps) => {

  const clearOrderComponent = () => {
    enrollStore.clearStore();
    orderDetailsStore.clearStore();

    specialistsStore.deleteSpecialistsList();
    servicesStore.deleteServicesList();
    scheduleStore.deleteScheduleListBySpecialist();
  }


  const selectedClient = async () => {
    orderDetailsStore.setOrderDetailsClient(props.client);
    enrollStore.setSelectButtonClientIsClicked(true);
    enrollStore.setIsOpenFormFindClient(false);
    enrollStore.setIsOpenListSpecialist(true);
  }

  const cancelClient = () => {
    // orderDetailsStore.deleteOrderDetailsClient();
    enrollStore.setSelectButtonClientIsClicked(false);
    enrollStore.setIsOpenListSpecialist(false);
    enrollStore.setIsOpenFormFindClient(true);
    specialistsStore.deleteSpecialistsList();
  }

  const selectedSpecialist = async () => {
    enrollStore.setSelectButtonSpecialistIsClicked(true);
    enrollStore.setIsOpenListSpecialist(false);
    enrollStore.setIsOpenListServices(true);
  }

  const cancelSpecialist = () => {
    //new
    specialistsStore.deleteSpecialistsList();

    servicesStore.setServicesList([]);
    enrollStore.setSelectButtonSpecialistIsClicked(false);
    enrollStore.setIsOpenListServices(false);
    enrollStore.setIsOpenListSpecialist(true);
    servicesStore.deleteServicesList();
  }

  const selectedServices = async () => {
    enrollStore.setSelectButtonServicesIsClicked(true);
    enrollStore.setIsOpenListServices(false);
    enrollStore.setIsOpenListDate(true);
  }

  const cancelServices = () => {
    //new
    servicesStore.deleteServicesList()

    enrollStore.setSelectButtonServicesIsClicked(false);
    enrollStore.setIsOpenListDate(false);
    enrollStore.setIsOpenListServices(true);
    scheduleStore.deleteScheduleListBySpecialist();
  }

  const selectedDate = async () => {
    enrollStore.setSelectButtonDateIsClicked(true);
    enrollStore.setIsOpenListDate(false);
    enrollStore.setIsSubmitOrder(true);
  }

  const cancelDate = () => {
    //new
    scheduleStore.deleteScheduleListBySpecialist();

    enrollStore.setSelectButtonDateIsClicked(false);
    enrollStore.setIsOpenListDate(true);
    enrollStore.setIsSubmitOrder(false);
  }


  const onClickSubmit = async () => {
    await CheckServices.postCheck(orderDetailsStore.getOrderDetails());
    props.deleteClient();
    if (props.notifications) {
      notificationsStore.setIsSubmitOrder(true);
    }
    clearOrderComponent();
  }

  const onClickClearAll = () => {
    clearOrderComponent();
  }


  return (
    <Card
      className="order_check_details"
      title="Детали записи"
      style={CardForm}
      bodyStyle={CardBodyForm}
    >
      {/* {orderDetailsStore.OrderDetailsClient */}
      {props.client
        ? <div className="order_check_details_client">
          <h3 className="order_check_details_client_title"> Клиент </h3>
          {/* <div className="order_check_details_client_fullname"> {orderDetailsStore.OrderDetailsClient?.full_name} </div>
          <div className="order_check_details_client_telephone"> {orderDetailsStore.OrderDetailsClient?.telephone} </div> */}
          <div className="order_check_details_client_fullname"> {props.client.full_name} </div>
          <div className="order_check_details_client_telephone"> {props.client.telephone} </div>
        </div>
        : <div className="order_check_details_message"> Ожидаем ваш заказ! </div>
      }

      {orderDetailsStore.OrderDetailsSpecialist &&
        <div className="order_check_details_specialist">
          <h3 className="order_check_details_specialist_title"> Специалист </h3>
          <div className="order_check_details_specialist_fullname"> {orderDetailsStore.OrderDetailsSpecialist?.full_name} </div>
        </div>
      }

      {orderDetailsStore.OrderDetailsServices.length !== 0 &&
        <div className="order_check_details_services">
          {orderDetailsStore.OrderDetailsServices.map((service: IService) =>
            <Row
              justify={'space-between'}
              wrap={false}
              className="order_check_details_service"
              key={service.service_id}
            >
              <Col className="order_check_details_service_info">
                <div className="order_check_details_service_info_name"> {service.name_service} </div>
              </Col>
              <Col className="order_check_details_info">
                <div className="order_check_details_info_cost"> {service.cost} руб. </div>
              </Col>
            </Row>
          )}
        </div>
      }

      {orderDetailsStore.OrderDetailsDate.length !== 0 && orderDetailsStore.OrderDetailsTime.length !== 0 &&
        <Row justify={'space-between'} className="order_check_details_datetime">
          <Col className="order_check_details_date"> {new Date(orderDetailsStore.OrderDetailsDate).toLocaleDateString()} </Col>
          <Col className="order_check_details_time"> {orderDetailsStore.OrderDetailsTime} — {orderDetailsStore.getOrderDetailsTotalTime} </Col>
        </Row>
      }

      {orderDetailsStore.OrderDetailsServices.length !== 0 &&
        <Row justify={'space-between'} className="order_check_details_totalcount">
          <Col className="order_check_details_totalcount_text"> Стоимость </Col>
          <Col className="order_check_details_totalcount_sum"> {orderDetailsStore.getOrderDetailsTotalCount} руб. </Col>
        </Row>
      }

      <div className="order_check_details_buttons_step">
        {/* Кнопка после клиента */}
        {/* {orderDetailsStore.OrderDetailsClient && !enrollStore.selectButtonClientIsClicked && */}
        {props.client && !enrollStore.selectButtonClientIsClicked &&
          <ButtonStep onClick={selectedClient}> Далее </ButtonStep>
        }
        {enrollStore.selectButtonClientIsClicked && !orderDetailsStore.OrderDetailsSpecialist &&
          <ButtonStep onClick={cancelClient}> Назад </ButtonStep>
        }

        {/* Кнопка после специалиста */}
        {orderDetailsStore.OrderDetailsSpecialist && !enrollStore.selectButtonSpecialistIsClicked &&
          <ButtonStep onClick={selectedSpecialist}> Далее </ButtonStep>
        }
        {enrollStore.selectButtonSpecialistIsClicked && orderDetailsStore.OrderDetailsServices.length === 0 &&
          <ButtonStep onClick={cancelSpecialist}> Назад </ButtonStep>
        }

        {/* Кнопка после услуг */}
        {enrollStore.IsNextServices && !enrollStore.selectButtonServicesIsClicked &&
          <ButtonStep onClick={selectedServices}> Далее </ButtonStep>
        }
        {enrollStore.selectButtonServicesIsClicked && orderDetailsStore.OrderDetailsDate.length === 0 &&
          <ButtonStep onClick={cancelServices}> Назад </ButtonStep>
        }

        {/* Кнопка после даты */}
        {enrollStore.IsNextDates && !enrollStore.selectButtonDateIsClicked &&
          <ButtonStep onClick={selectedDate}> Далее </ButtonStep>
        }
        {enrollStore.selectButtonDateIsClicked &&
          <ButtonStep onClick={cancelDate}> Назад </ButtonStep>
        }
      </div>

      {/* Кнопки очистки и submit */}
      <Space
        className="order_check_details_buttons"
        style={{ width: "100%", justifyContent: "center" }}
      >
        {orderDetailsStore.OrderDetailsSpecialist &&
          <Button
            className="order_check_details_clear_button"
            danger
            onClick={onClickClearAll}
          >
            Всё очистить
          </Button>
        }
        {enrollStore.selectButtonDateIsClicked &&
          <Button
            className="order_check_details_submit_button"
            type="primary"
            onClick={onClickSubmit}
          >
            Записаться
          </Button>
        }
      </Space>
    </Card >
  )
});


export default OrderDetails;