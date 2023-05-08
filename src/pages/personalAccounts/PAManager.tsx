import '../../style/css/personal_account/personalAccount.css';
import { observer } from "mobx-react";
import { useState } from "react";
import { Button, Col, Row, Space } from "antd";
import { FileAddOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import OrderAdd from "../../components/PersonalAccount/OrderAdd";
import ClientAdd from "../../components/PersonalAccount/ClientAdd";
import OrderFind from "../../components/PersonalAccount/OrderFind";
import ClientFind from "../../components/PersonalAccount/ClientFind";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import enrollStore from "../../store/EnrollStoreClass";
import scheduleStore from "../../store/ScheduleStoreClass";
import servicesStore from "../../store/ServicesStoreClass";
import specialistsStore from "../../store/SpecialistsStoreClass";
import CheckPAStoreClass from "../../store/CheckPAStoreClass";
import orderDetailsStore from "../../store/OrderDetailsStoreClass";
import ClientPAStoreClass from "../../store/ClientPAStoreClass";
import NotificationsPAStoreClass from "../../store/NotificationsPAStoreClass";


const clientStore = new ClientPAStoreClass();
const checkStore = new CheckPAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();


const PAManager = observer(() => {
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenAddClientForm, setIsOpenAddClientForm] = useState<boolean>(false);
  const [isOpenFindOrderForm, setIsOpenFindOrderClientForm] = useState<boolean>(false);
  const [isOpenAddOrderForm, setIsOpenAddOrderClientForm] = useState<boolean>(false);


  const clearAll = () => {
    notificationsStore.deleteNotificationsChecks();
    notificationsStore.deleteNotificationsClient();
    notificationsStore.deleteIsSubmitOrder();

    checkStore.deleteChecks();
    clientStore.deleteClient();
    enrollStore.clearStore();
    orderDetailsStore.clearStore();

    specialistsStore.deleteSpecialistsList();
    servicesStore.deleteServicesList();
    scheduleStore.deleteScheduleListBySpecialist();
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
    <div className="personal_account_manager_page">
      <h1 className="personal_account_manager_title title--border"> Личный кабинет </h1>
      <Row className="personal_account_manager_row">
        <Col className="personal_account_manager_info" span={4}>
          <CardPAUser />

          <Space
            className="personal_account_manager_control_buttons"
            direction="vertical"
            style={{ width: "100%" }}>
            <Button block onClick={onClickFoundClientButton}> <SearchOutlined /> Найти клиента </Button>
            <Button block onClick={onClickAddClientButton}> <UserAddOutlined /> Добавить клиента </Button>
            <Button block onClick={onClickFindOrderButton}> <SearchOutlined /> Найти заказ </Button>
            <Button block onClick={onClickAddOrderButton}> <FileAddOutlined /> Добавить заказ </Button>
          </Space>
        </Col>

        <Col
          className="personal_account_manager_forms"
          span={20}
        >
          {isOpenFindClientForm &&
            <ClientFind
              notificationsStore={notificationsStore}
              clientStore={clientStore}
            />
          }
          {isOpenAddClientForm &&
            <ClientAdd notificationsStore={notificationsStore} />
          }
          {isOpenFindOrderForm &&
            <OrderFind
              notificationsStore={notificationsStore}
              clientStore={clientStore}
              checkStore={checkStore}
            />
          }
          {isOpenAddOrderForm &&
            <OrderAdd
              notificationsStore={notificationsStore}
              clientStore={clientStore}
            />
          }
        </Col>
      </Row>
    </div>
  )
});


export default PAManager;