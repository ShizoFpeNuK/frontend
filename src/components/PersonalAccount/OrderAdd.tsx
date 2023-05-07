import '../../style/css/order/order.css';
import { IClient } from "../../options/model/client.model";
import { Col, Row } from "antd";
import { observer } from "mobx-react";
import { useState } from "react";
import ListDates from "../OrderComponents/ListDates";
import enrollStore from "../../store/EnrollStoreClass";
import OrderDetails from "../OrderComponents/OrderDetails";
import ListServices from "../OrderComponents/ListServices";
import ResultSuccess from "../Results/ResultSuccess";
import FindClientForm from "./FormClientFind";
import ListSpecialists from "../OrderComponents/ListSpecialists";
import notificationsStore from "../../store/NotificationsStoreClass";
import ResultErrorNotCorrectData from "../Results/ResultErrorNotCorrectData";


interface OrderAddProps {
  notifications?: boolean,
}


const OrderAdd = observer(({ notifications }: OrderAddProps) => {
  const [client, setClient] = useState<IClient | null>(null);


  const getClient = (client: IClient) => {
    setClient(client);
  }

  const deleteClient = () => {
    setClient(null);
  }


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
              notifications={notifications ?? false}
              isOrder={true}
              getClient={getClient}
              deleteClient={deleteClient}
            />
          </Col>
          : <Col className="order_lists" span={16}>
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
          {client &&
            <OrderDetails notifications={notifications ?? false} client={client} deleteClient={deleteClient} />
          }
          {notificationsStore.isNotFindClient &&
            <ResultErrorNotCorrectData title="Клиент не был найден" />
          }
          {notificationsStore.isSubmitOrder &&
            <ResultSuccess title="Запись успешно произведена" />
          }
        </Col>
      </Row>
    </div>
  )
})


export default OrderAdd;