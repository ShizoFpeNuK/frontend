import '../style/css/enroll.css'
import { Col, Row } from "antd";
import { observer } from 'mobx-react';
import ListDates from "../components/OrderComponents/ListDates";
import enrollStore from "../store/EnrollStoreClass";
import OrderDetails from "../components/OrderComponents/OrderDetails";
import ListServices from "../components/OrderComponents/ListServices";
import ListSpecialists from "../components/OrderComponents/ListSpecialists";


const Enroll = observer(() => {
  return (
    <div className="enroll_page">
      <h1 className="enroll_title title--border"> Запись на приём </h1>
      <Row className="enroll_row">
        {enrollStore.isSubmitOrder &&
          <Col className="enroll_list_message" span={10}> Нажмите кнопку "Записаться", чтобы создать запись в нашу парикмахерскую. </Col>
        }

        {enrollStore.isOpenListSpecialist === true &&
          <Col className="enroll_list_specialists" span={10}>
            <ListSpecialists />
          </Col>
        }

        {enrollStore.isOpenListServices === true &&
          <Col className="enroll_list_services" span={10}>
            <ListServices />
          </Col>
        }

        {enrollStore.isOpenListDate === true &&
          <Col className="enroll_list_dates" span={10}>
            <ListDates />
          </Col>
        }

        <Col className="enroll_order" span={8}>
          <Col className="enroll_order_details" span={24}>
            <OrderDetails />
          </Col>
        </Col>
      </Row>
    </div >
  )
});


export default Enroll;