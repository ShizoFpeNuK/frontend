import '../../style/css/personal_account/paControl.css';
import { useState } from "react";
import { Button, Col, Row, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import OrderFind from "../../components/PersonalAccount/components/OrderFind";
import ClientFind from "../../components/PersonalAccount/components/ClientFind";
import ServiceFind from "../../components/PersonalAccount/components/ServiceFind";
import ScheduleFind from "../../components/PersonalAccount/components/ScheduleFind";
import EmployeeFind from "../../components/PersonalAccount/components/EmployeeFind";
import EstablishmentFind from "../../components/PersonalAccount/components/EstablishmentFind";


const PAAnalyst = () => {
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenFindEmployeeForm, setIsOpenFindEmployeeForm] = useState<boolean>(false);
  const [isOpenFindScheduleForm, setIsOpenFindScheduleForm] = useState<boolean>(false);
  const [isOpenFindOrderForm, setIsOpenFindOrderClientForm] = useState<boolean>(false);
  const [isOpenFindEstablishmentWindow, setIsOpenFindEstablishmentWindow] = useState<boolean>(false);
  const [isOpenFindServiceWindow, setIsOpenFindServiceWindow] = useState<boolean>(false);


  const closeAllWindow = () => {
    setIsOpenFindClientForm(false);
    setIsOpenFindEmployeeForm(false);
    setIsOpenFindScheduleForm(false);
    setIsOpenFindServiceWindow(false);
    setIsOpenFindOrderClientForm(false);
    setIsOpenFindEstablishmentWindow(false);
  }

  const onClickFoundClientButton = () => {
    closeAllWindow();
    setIsOpenFindClientForm(!isOpenFindClientForm);
  }

  const onClickFoundEmployeeButton = () => {
    closeAllWindow();
    setIsOpenFindEmployeeForm(!isOpenFindEmployeeForm);
  }

  const onClickFoundServicesButton = async () => {
    closeAllWindow();
    setIsOpenFindServiceWindow(!isOpenFindServiceWindow);
  }

  const onClickFoundEstablishmentButton = async () => {
    closeAllWindow();
    setIsOpenFindEstablishmentWindow(!isOpenFindEstablishmentWindow);
  }

  const onClickFoundScheduleButton = () => {
    closeAllWindow();
    setIsOpenFindScheduleForm(!isOpenFindScheduleForm);
  }

  const onClickFindOrderButton = () => {
    closeAllWindow();
    setIsOpenFindOrderClientForm(!isOpenFindOrderForm);
  }


  return (
    <div className="personal_account_control_page">
      <h1 className="personal_account_control_title title--border"> Личный кабинет </h1>
      <Row className="personal_account_control_row">
        <Col className="personal_account_control_info" span={4}>
          {/* <CardPAUser /> */}
          <Space
            className="personal_account_manager_control_buttons"
            direction="vertical"
            style={{ width: "100%" }}>
            <Button block onClick={onClickFoundClientButton}> <SearchOutlined /> Найти клиента </Button>
            <Button block onClick={onClickFoundEmployeeButton}> <SearchOutlined /> Найти сотрудника </Button>
            <Button block onClick={onClickFoundServicesButton}> <SearchOutlined /> Посмотреть услуги </Button>
            <Button block onClick={onClickFoundEstablishmentButton}> <SearchOutlined /> Посмотреть заведения </Button>
            <Button block onClick={onClickFoundScheduleButton}> <SearchOutlined /> Посмотреть расписание </Button>
            <Button block onClick={onClickFindOrderButton}> <SearchOutlined /> Найти заказ </Button>
          </Space>
        </Col>

        <Col
          className="personal_account_control_forms"
          span={20}
        >
          {isOpenFindClientForm &&
            <ClientFind />
          }
          {isOpenFindEmployeeForm &&
            <EmployeeFind />
          }
          {isOpenFindServiceWindow &&
            <ServiceFind />
          }
          {isOpenFindEstablishmentWindow &&
            <EstablishmentFind />
          }
          {isOpenFindScheduleForm &&
            <ScheduleFind />
          }
          {isOpenFindOrderForm &&
            <OrderFind />
          }
        </Col>
      </Row>
    </div>
  )
}


export default PAAnalyst;