import '../style/css/personal_account/personalAccount.css';
import { observer } from "mobx-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Col, Row, Space } from "antd";
import { FileAddOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import OrderAdd from "../components/PersonalAccount/OrderAdd";
import CardBase from "../components/PersonalAccount/CardBase";
import ClientAdd from "../components/PersonalAccount/ClientAdd";
import OrderFind from "../components/PersonalAccount/OrderFind";
import ClientFind from "../components/PersonalAccount/ClientFind";
import loginStore from "../store/LoginStoreClass";
import enrollStore from '../store/EnrollStoreClass';
import scheduleStore from "../store/ScheduleStoreClass";
import servicesStore from "../store/ServicesStoreClass";
import specialistsStore from "../store/SpecialistsStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";
import notificationsStore from "../store/NotificationsStoreClass";
import checkStore from "../store/CheckStoreClass";
import clientStore from "../store/ClientStoreClass";


const PersonalAccount = observer(() => {
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenAddClientForm, setIsOpenAddClientForm] = useState<boolean>(false);
  const [isOpenAddOrderForm, setIsOpenAddOrderClientForm] = useState<boolean>(false);
  const [isOpenFindOrderForm, setIsOpenFindOrderClientForm] = useState<boolean>(false);


  if (!loginStore.isLogin) {
    return <Navigate to="/auth" />
  }


  const clearAll = () => {
    notificationsStore.deleteNotificationsChecks();
    notificationsStore.deleteNotificationsClient();
    notificationsStore.deleteIsSubmitOrder();

    // checkStore.deleteChecks();
    // clientStore.deleteClient();
    enrollStore.clearStore();
    orderDetailsStore.clearStore();

    specialistsStore.deleteSpecialistsList();
    servicesStore.deleteServicesList();
    scheduleStore.deleteScheduleListBySpecialist();
  }


  const onClickButtonLogout = () => {
    loginStore.setIsLogin(false);
  }

  const onClickFoundClientButton = () => {
    clearAll();
    setIsOpenAddClientForm(false);
    setIsOpenAddOrderClientForm(false);
    setIsOpenFindOrderClientForm(false);
    setIsOpenFindClientForm(!isOpenFindClientForm);
  }

  const onClickAddClientButton = () => {
    clearAll();
    setIsOpenFindClientForm(false);
    setIsOpenAddOrderClientForm(false);
    setIsOpenFindOrderClientForm(false);
    setIsOpenAddClientForm(!isOpenAddClientForm);
  }

  const onClickAddOrderButton = () => {
    clearAll();
    setIsOpenAddClientForm(false);
    setIsOpenFindClientForm(false);
    setIsOpenFindOrderClientForm(false);
    setIsOpenAddOrderClientForm(!isOpenAddOrderForm);
  }

  const onClickFindOrderButton = () => {
    clearAll();
    setIsOpenAddClientForm(false);
    setIsOpenFindClientForm(false);
    setIsOpenAddOrderClientForm(false);
    setIsOpenFindOrderClientForm(!isOpenFindOrderForm);
  }


  return (
    <div className="personal_account_page">
      <h1 className="personal_account_title title--border"> Личный кабинет </h1>
      <Row className="personal_account_row">
        <Col className="personal_account_info" span={4}>
          <CardBase title="Ваши сведения" info={loginStore.user!}>
            <Button
              className="personal_account_info_inner_button"
              block
              onClick={onClickButtonLogout}
            >
              Выйти
            </Button>
          </CardBase>
          <Space
            className="personal_account_control_buttons"
            direction="vertical"
            style={{ width: "100%" }}>
            <Button block onClick={onClickFoundClientButton}> <SearchOutlined /> Найти клиента </Button>
            <Button block onClick={onClickAddClientButton}> <UserAddOutlined /> Добавить клиента </Button>
            <Button block onClick={onClickFindOrderButton}> <SearchOutlined /> Найти заказ </Button>
            <Button block onClick={onClickAddOrderButton}> <FileAddOutlined /> Добавить заказ </Button>
          </Space>
        </Col>

        <Col
          className="personal_account_forms"
          span={20}
        >
          {isOpenFindClientForm &&
            <ClientFind notifications={true}/>
          }
          {isOpenAddClientForm &&
            <ClientAdd notifications={true} />
          }
          {isOpenFindOrderForm &&
            <OrderFind notifications={true} />
          }
          {isOpenAddOrderForm &&
            <OrderAdd notifications={true}/>
          }
        </Col>
      </Row>
    </div>
  )
});


export default PersonalAccount;