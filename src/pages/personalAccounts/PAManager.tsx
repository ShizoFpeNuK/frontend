import '../../style/css/personal_account/paManager.css';
import { observer } from "mobx-react";
import { useState } from "react";
import { Button, Col, Row, Space } from "antd";
import { FileAddOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import OrderAdd from "../../components/PersonalAccount/components/OrderAdd";
import ClientAdd from "../../components/PersonalAccount/components/ClientAdd";
import OrderFind from "../../components/PersonalAccount/components/OrderFind";
import ClientFind from "../../components/PersonalAccount/components/ClientFind";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import EnrollStoreClass from "../../store/enrollStore/EnrollStoreClass";
import CheckPAStoreClass from "../../store/paStore/CheckPAStoreClass";
import ClientPAStoreClass from "../../store/paStore/ClientPAStoreClass";
import ServicesStoreClass from "../../store/ServicesStoreClass";
import OrderDetailsStoreClass from "../../store/enrollStore/OrderDetailsStoreClass";
import ScheduleOrderStoreClass from "../../store/enrollStore/ScheduleOrderStoreClass";
import SpecialistsPAStoreClass from "../../store/paStore/SpecialistsPAStoreClass";
import EstablishmentPAStoreClass from "../../store/paStore/EstablishmentsPAStoreClass";
import NotificationsPAStoreClass from "../../store/paStore/NotificationsPAStoreClass";


const checkStore = new CheckPAStoreClass();
const enrollStore = new EnrollStoreClass();
const clientStore = new ClientPAStoreClass();
const servicesStore = new ServicesStoreClass();
const scheduleStore = new ScheduleOrderStoreClass();
const specialistsStore = new SpecialistsPAStoreClass();
const orderDetailsStore = new OrderDetailsStoreClass();
const establishmentStore = new EstablishmentPAStoreClass();
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
    scheduleStore.deleteScheduleList();
    establishmentStore.deleteEstablishmentsList();
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
              enrollStore={enrollStore}
              clientStore={clientStore}
              servicesStore={servicesStore}
              scheduleStore={scheduleStore}
              specialistsStore={specialistsStore}
              orderDetailsStore={orderDetailsStore}
              establishmentStore={establishmentStore}
              notificationsStore={notificationsStore}
            />
          }
        </Col>
      </Row>
    </div>
  )
});


export default PAManager;