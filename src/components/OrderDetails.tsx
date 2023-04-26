import { observer } from "mobx-react";
import { Card, List, Row, Col, Button } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import orderDetailsStore from "../store/OrderDetailsStoreClass";
import servicesStore from "../store/ServicesStoreClass";


export const OrderDetails = observer(() => {
  const onClickSpecialist = async () => {
    await servicesStore.getServicesListBySpecialistId(orderDetailsStore.OrderDetailsSpecialist!.employee_id);
  }


  return (
    <Card title="Детали записи" style={CardForm} bodyStyle={{ textAlign: "left", ...CardBodyForm }}>
      <List
        className="enroll_order_details_specialist"
        itemLayout="horizontal"
        header={orderDetailsStore.OrderDetailsSpecialist?.full_name}
      >
        {orderDetailsStore.OrderDetailsServices.map((service, index) =>
          <List.Item className="enroll_order_details_item" key={index}>
            <List.Item.Meta
              className="enroll_order_details_item_meta"
              description={
                <Row className="enroll_order_details_item_meta_row">
                  <Col className="enroll_order_details_item_meta_info">
                    <span className="enroll_order_details_item_meta_info_name-services">{service.name_service}</span>
                  </Col>
                  <Col className="enroll_order_details_item_meta_info">
                    <span className="enroll_order_details_item_meta_info_cost-services">{service.cost}</span>
                  </Col>
                </Row>
              }
            />
          </List.Item>
        )}
        <div className="enroll_order_details_datetime">
          <div className="enroll_order_details_date"> {orderDetailsStore.OrderDetailsDate} </div>
          <div className="enroll_order_details_time"> {orderDetailsStore.OrderDetailsTime} </div>
        </div>
      </List>

      {/* {orderDetailsStore.OrderDetailsSpecialist &&
        <Button type="primary" block onClick={onClickSpecialist}> Далее </Button>
      } */}
    </Card>
  )
});