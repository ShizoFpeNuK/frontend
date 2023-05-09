import '../../style/css/order/order.css';
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import ListDates from "../../OrderComponents/ListDates";
import enrollStore from "../../../store/EnrollStoreClass";
import OrderDetails from "../../OrderComponents/OrderDetails";
import ListServices from "../../OrderComponents/ListServices";
import ResultSuccess from "../../Results/ResultSuccess";
import FindClientForm from "../forms/FormClientFind";
import ListSpecialists from "../../OrderComponents/ListSpecialists";
import ClientPAStoreClass from "../../../store/ClientPAStoreClass";
import ListEstablishments from "../../OrderComponents/ListEstablishments";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import NotificationsPAStoreClass from "../../../store/NotificationsPAStoreClass";


interface OrderAddProps {
  clientStore: ClientPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}


const OrderAdd = observer(({ clientStore, notificationsStore }: OrderAddProps) => {
  return (
    <div className="personal_account_forms_order">
      <h2 className="personal_account_forms_order_title title--border"> Добавить заказ </h2>
      <Row
        className="personal_account_forms_order_row"
        justify={'space-between'}
        wrap={false}
      >
        {enrollStore.isOpenFormFindClient
          ? <Col className="order_form" span={6}>
            <FindClientForm
              notificationsStore={notificationsStore}
              clientStore={clientStore}
            />
          </Col>
          : <Col className="order_lists" span={16}>
            {enrollStore.isOpenListEstablishment &&
              <ListEstablishments />
            }
            {enrollStore.isOpenListSpecialist &&
              <ListSpecialists />
            }
            {enrollStore.isOpenListServices &&
              <ListServices />
            }
            {enrollStore.isOpenListDate &&
              <ListDates />
            }
            {enrollStore.isSubmitOrder &&
              <Col className="order_message">
                Нажмите кнопку <span>Записаться</span> , чтобы создать запись в нашу парикмахерскую.
              </Col>
            }
          </Col>
        }

        <Col className="order_check" span={8}>
          {clientStore.client &&
            <OrderDetails
              clientStore={clientStore}
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