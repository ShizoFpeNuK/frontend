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


export const ListServices = () => {
  const onClick = (e: any) => { //Для теста
    console.log(e);
  }


  return (
    <Card title="Список услуг" style={CardForm} bodyStyle={CardBodyForm}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className="enroll_list_services_item" onClick={onClick}>
            <List.Item.Meta
              title={"Стрижка налысо"}
              description={
                <div>10 мин - 300 руб.</div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  )
};