import '../../../style/css/order/order.css';
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import ListDates from "../../OrderComponents/ListDates";
import OrderDetails from "../../OrderComponents/OrderDetails";
import ListServices from "../../OrderComponents/ListServices";
import ResultSuccess from "../../Results/ResultSuccess";
import FindClientForm from "../forms/FormClientFind";
import ListSpecialists from "../../OrderComponents/ListSpecialists";
import EnrollStoreClass from "../../../store/enrollStore/EnrollStoreClass";
import ClientPAStoreClass from "../../../store/paStore/ClientPAStoreClass";
import ListEstablishments from "../../OrderComponents/ListEstablishments";
import ServicesStoreClass from "../../../store/ServicesStoreClass";
import SpecialistsPAStoreClass from "../../../store/paStore/SpecialistsPAStoreClass";
import OrderDetailsStoreClass from "../../../store/enrollStore/OrderDetailsStoreClass";
import ScheduleOrderStoreClass from "../../../store/enrollStore/ScheduleOrderStoreClass";
import EstablishmentPAStoreClass from "../../../store/paStore/EstablishmentsPAStoreClass";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface OrderAddProps {
  enrollStore: EnrollStoreClass;
  clientStore: ClientPAStoreClass,
  servicesStore: ServicesStoreClass,
  scheduleStore: ScheduleOrderStoreClass,
  specialistsStore: SpecialistsPAStoreClass,
  orderDetailsStore: OrderDetailsStoreClass,
  establishmentStore: EstablishmentPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}


const OrderAdd = observer(({ clientStore, notificationsStore, ...props }: OrderAddProps) => {
  return (
    <div className="personal_account_forms_order">
      <h2 className="personal_account_forms_order_title title--border"> Добавить заказ </h2>
      <Row
        className="personal_account_forms_order_row"
        justify={'space-between'}
        wrap={false}
      >
        {props.enrollStore.isOpenFormFindClient
          ? <Col className="order_form" span={6}>
            <FindClientForm
              notificationsStore={notificationsStore}
              clientStore={clientStore}
            />
          </Col>
          : <Col className="order_lists" span={16}>
            {props.enrollStore.isOpenListEstablishment &&
              <ListEstablishments
                establishmentStore={props.establishmentStore}
                orderDetailsStore={props.orderDetailsStore}
              />
            }
            {props.enrollStore.isOpenListSpecialist &&
              <ListSpecialists
                specialistsStore={props.specialistsStore}
                orderDetailsStore={props.orderDetailsStore}
              />
            }
            {props.enrollStore.isOpenListServices &&
              <ListServices
                servicesStore={props.servicesStore}
                orderDetailsStore={props.orderDetailsStore}
              />
            }
            {props.enrollStore.isOpenListDate &&
              <ListDates
                scheduleStore={props.scheduleStore}
                orderDetailsStore={props.orderDetailsStore}
              />
            }
            {props.enrollStore.isSubmitOrder &&
              <Col className="order_message">
                Нажмите кнопку <span>Записаться</span> , чтобы создать запись в нашу парикмахерскую.
              </Col>
            }
          </Col>
        }

        <Col className="order_check" span={8}>
          {clientStore.client &&
            <OrderDetails
              enrollStore={props.enrollStore}
              clientStore={clientStore}
              servicesStore={props.servicesStore}
              scheduleStore={props.scheduleStore}
              specialistsStore={props.specialistsStore}
              orderDetailsStore={props.orderDetailsStore}
              establishmentStore={props.establishmentStore}
              notificationsStore={notificationsStore}
            />
          }
          {notificationsStore?.isNotFindClient &&
            <ResultErrorNotCorrectData title="Клиент не был найден" />
          }
          {notificationsStore?.isSubmitOrder &&
            <ResultSuccess title="Запись успешно произведена" />
          }
        </Col>
      </Row>
    </div>
  )
})


export default OrderAdd;