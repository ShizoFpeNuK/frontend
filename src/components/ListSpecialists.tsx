import { Avatar, List } from "antd";


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


export const ListSpecialists = () => {
  const onClick = (e: any) => { //Для теста
    console.log(e);
  }


  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      bordered={true}
      renderItem={(item, index) => (
        <List.Item className="enroll_list_specialists_item" onClick={onClick}>
          <List.Item.Meta
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
            title={item.title}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
};