import { useState } from "react";
import { Avatar, Button, Col, List, Row, Space } from "antd"
import { CalendarOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons"


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


export const Enroll = () => {
  const [isOpenListSpecialist, setIsOpenListSpecialist] = useState<boolean>(false);
  const [isOpenListDate, setIsOpenListDate] = useState<boolean>(false);


  const onClickButtonSpecialist = () => {
    setIsOpenListSpecialist(!isOpenListSpecialist);
    setIsOpenListDate(false);
  }

  const onClickButtonDate = () => {
    setIsOpenListDate(!isOpenListDate);
    setIsOpenListSpecialist(false);
  }


  const onClick = (e: any) => { //Для теста
    console.log(e);
  }


  return (
    <div className="eroll_page">
      <h1 className="eroll_title"> Запись на приём </h1>
      <Row className="eroll_row">
        <Col className="eroll_buttons" span={8}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button className="eroll_button_specialist" onClick={onClickButtonSpecialist} block> <UserOutlined /> Выбрать специалиста </Button>
            <Button className="eroll_button_date" onClick={onClickButtonDate} block> <CalendarOutlined /> Выбрать дату и время </Button>
            <Button className="eroll_button_services" block> <UnorderedListOutlined /> Выбрать услуги </Button>
          </Space>
        </Col>
        {isOpenListSpecialist === false && isOpenListDate === false &&
          <Col span={8}> Ждём вашего заказа </Col>
        }
        {isOpenListSpecialist &&
          <Col className="eroll_list_specialist" span={8}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              bordered={true}
              renderItem={(item, index) => (
                <List.Item className="eroll_list_specialist_item" onClick={onClick}>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={item.title}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
            />
          </Col>
        }
        {isOpenListDate &&
          <Col className="eroll_list_date" span={8}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              bordered={true}
              renderItem={(item, index) => (
                <List.Item className="eroll_list_date_item" onClick={onClick}>
                  <List.Item.Meta
                    title={"23 мая"}
                    description={
                      <div className="eroll_list_date_item_buttons">
                        <Button className="eroll_list_date_item_button">15:00</Button>
                        <Button className="eroll_list_date_item_button">17:00</Button>
                        <Button className="eroll_list_date_item_button">18:00</Button>
                        <Button className="eroll_list_date_item_button">19:00</Button>
                        <Button className="eroll_list_date_item_button">15:00</Button>
                        <Button className="eroll_list_date_item_button">17:00</Button>
                        <Button className="eroll_list_date_item_button">18:00</Button>
                        <Button className="eroll_list_date_item_button">19:00</Button>
                        <Button className="eroll_list_date_item_button">15:00</Button>
                        <Button className="eroll_list_date_item_button">17:00</Button>
                        <Button className="eroll_list_date_item_button">18:00</Button>
                        <Button className="eroll_list_date_item_button">19:00</Button>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Col>
        }

        <Col className="eroll_order" span={8}>
          <div>Заказ</div>
        </Col>
      </Row>
    </div>
  )
};