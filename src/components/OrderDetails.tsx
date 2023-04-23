import { Col, List } from "antd";


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
    <Col className="enroll_order_details" span={24}>
      <List //Скорее всего, можно заменить на два div
        itemLayout="horizontal"
        dataSource={data}
        bordered={true}
        renderItem={(item, index) => (
          <List.Item className="enroll_order_details_item">
            <List.Item.Meta
              title={"Детали"}
              description={"Серёжа"}
            />
          </List.Item>
        )}
      />
    </Col>
  )
};