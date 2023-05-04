import '../../style/css/order/order.css';
import { Col, Row } from "antd";
import { observer } from "mobx-react";
import ListDates from "./ListDates";
import enrollStore from "../../store/EnrollStoreClass";
import OrderDetails from "./OrderDetails";
import ListServices from "./ListServices";
import FindClientForm from "../PersonalAccount/FormFindClient";
import ListSpecialists from "./ListSpecialists";


const Order = observer(() => {
  return (
    <Row
      justify={'space-between'}
      wrap={false}
      className="order_row"
    >
      {enrollStore.isOpenFormFindClient
        ? <Col className="order_form" span={6}>
          <FindClientForm isOrder={true} />
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
        <OrderDetails />
      </Col>
    </Row>
  )
})


export default Order;