import { observer } from "mobx-react";
import { Card, List, Row, Col, Button } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const OrderDetails = observer(() => {
  const onClick = () => {
    console.log("Далее");
  }


  return (
    <Card title="Детали записи" style={CardForm} bodyStyle={{ textAlign: "left", ...CardBodyForm }}>
      <List
        header={orderDetailsStore.OrderDetailsSpecialist?.full_name}
        className="enroll_order_details_services"
        itemLayout="horizontal"
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
      </List>
      <Button type="primary" block onClick={onClick}> Далее </Button>
    </Card>
  )
});