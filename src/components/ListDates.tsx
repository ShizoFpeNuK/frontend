import { Button, Card, List } from "antd";
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


export const ListDates = () => {
  return (
    <Card title="Список дат и времени" style={CardForm} bodyStyle={CardBodyForm}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className="enroll_list_dates_item">
            <List.Item.Meta
              title={"23 мая"}
              description={
                <div className="enroll_list_dates_item_buttons">
                  <Button className="enroll_list_dates_item_button">15:00</Button>
                  <Button className="enroll_list_dates_item_button">17:00</Button>
                  <Button className="enroll_list_dates_item_button">18:00</Button>
                  <Button className="enroll_list_dates_item_button">19:00</Button>
                  <Button className="enroll_list_dates_item_button">15:00</Button>
                  <Button className="enroll_list_dates_item_button">17:00</Button>
                  <Button className="enroll_list_dates_item_button">18:00</Button>
                  <Button className="enroll_list_dates_item_button">19:00</Button>
                  <Button className="enroll_list_dates_item_button">15:00</Button>
                  <Button className="enroll_list_dates_item_button">17:00</Button>
                  <Button className="enroll_list_dates_item_button">18:00</Button>
                  <Button className="enroll_list_dates_item_button">19:00</Button>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  )
};