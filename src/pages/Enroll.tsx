import '../style/css/enroll.css'
import { useState } from "react";
import { OrderForm } from "../components/OrderForm";
import { ListDates } from "../components/ListDates";
import { ISpecialist } from "../options/model/specialist.model";
import { ListServices } from "../components/ListServices";
import { OrderDetails } from "../components/OrderDetails";
import { ListSpecialists } from "../components/ListSpecialists";
import { Button, Col, Row, Space } from "antd";
import { CalendarOutlined, UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import specialistsStore from "../store/SpecialistsStoreClass";


export const Enroll = () => {
  const [isOpenListSpecialist, setIsOpenListSpecialist] = useState<boolean>(false);
  const [isOpenListDate, setIsOpenListDate] = useState<boolean>(false);
  const [isOpenListServices, setIsOpenListServices] = useState<boolean>(false);


  const onClickButtonSpecialist = () => {
    setIsOpenListSpecialist(!isOpenListSpecialist);
    setIsOpenListDate(false);
    setIsOpenListServices(false);
  }

  const onClickButtonDate = () => {
    setIsOpenListDate(!isOpenListDate);
    setIsOpenListSpecialist(false);
    setIsOpenListServices(false);
  }

  const onClickButtonServices = () => {
    setIsOpenListServices(!isOpenListServices);
    setIsOpenListSpecialist(false);
    setIsOpenListDate(false);
  }


  return (
    <div className="enroll_page">
      <h1 className="enroll_title"> Запись на приём </h1>
      <Row className="enroll_row">
        <Col className="enroll_buttons" span={6}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button className="enroll_button_specialist" onClick={onClickButtonSpecialist} block> <UserOutlined /> Выбрать специалиста </Button>
            <Button className="enroll_button_date" onClick={onClickButtonDate} block> <CalendarOutlined /> Выбрать дату и время </Button>
            <Button className="enroll_button_services" onClick={onClickButtonServices} block> <UnorderedListOutlined /> Выбрать услуги </Button>
          </Space>
        </Col>

        {/* Появление какого-либо списка в зависимости от нажатой кнопки */}
        {isOpenListSpecialist === false && isOpenListDate === false && isOpenListServices === false &&
          <Col className="enroll_list_message" span={10}> Ждём вашего заказа </Col>
        }
        {isOpenListSpecialist &&
          <Col className="enroll_list_specialists" span={10}>
            <ListSpecialists />
          </Col>
        }
        {isOpenListDate &&
          <Col className="enroll_list_services" span={10}>
            <ListDates />
          </Col>
        }
        {isOpenListServices &&
          <Col className="enroll_list_dates" span={10}>
            <ListServices />
          </Col>
        }

        <Col className="enroll_order" span={8}>
          <Row className="enroll_order_row">
            <Col className="enroll_order_form" span={24}>
              <OrderForm />
            </Col>
          </Row>
          <Row className="enroll_order_row">
            <Col className="enroll_order_details" span={24}>
              <OrderDetails />
            </Col>
          </Row>
        </Col>
      </Row>
    </div >
  )
};