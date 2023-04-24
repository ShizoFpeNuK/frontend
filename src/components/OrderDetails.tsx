import { observer } from "mobx-react";
import { Card, List } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


export const OrderDetails = observer(() => {
  function deleteService(id: number) {
    orderDetailsStore.deleteOrderDetailsServices(id)
  }


  return (
    <Card title="Детали записи" style={CardForm} bodyStyle={{ textAlign: "left", ...CardBodyForm }}>
      <List
        header={orderDetailsStore.OrderDetailsSpecialistName}
        className="enroll_order_details_services"
        itemLayout="horizontal"
      >
        {orderDetailsStore.OrderDetailsServices.map((service, index) =>
          <List.Item className="enroll_order_details_item" key={index} onClick={() => deleteService(index)}>
            <List.Item.Meta
              description={service} />
          </List.Item>
        )}
      </List>
    </Card>
  )
});