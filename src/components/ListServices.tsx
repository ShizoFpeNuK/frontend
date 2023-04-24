import { Card, List } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import orderDetailsStore from "../store/OrderDetailsStoreClass";
import { observer } from "mobx-react";


const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];


export const ListServices = observer(() => {
  const onClick = (e: any) => {
    const serviceItem = e.target.closest(".enroll_list_services_item");
    if (serviceItem) {
      const serviceName = serviceItem.querySelector(".ant-list-item-meta-title");
      orderDetailsStore.setOrderDetailsServices(serviceName.innerText);
      console.log(serviceName.innerText);
      // console.log(orderDetailsStore.OrderDetailsServices);
    }
  }


  return (
    <Card title="Список услуг" style={CardForm} bodyStyle={CardBodyForm}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className="enroll_list_services_item" onClick={onClick}>
            <List.Item.Meta
              className="enroll_list_services_item_meta"
              title={item.title}
              description={
                <div>10 мин - 300 руб.</div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  )
});