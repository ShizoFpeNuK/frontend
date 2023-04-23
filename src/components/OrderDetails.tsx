import { Card, List } from "antd";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";


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


export const OrderDetails = () => {
  return (
    <Card title="Детали записи" style={CardForm} bodyStyle={CardBodyForm}>
      <List //Скорее всего, можно заменить на два div
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className="enroll_order_details_item">
            <List.Item.Meta
              title={"Детали"}
              description={"Серёжа"}
            />
          </List.Item>
        )}
      />
    </Card>
  )
};