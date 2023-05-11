import '../../style/css/personal_account/paControl.css';
import { useState } from "react";
import { Button, Col, Row, Space } from "antd";
import { FileAddOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import OrderAdd from "../../components/PersonalAccount/components/OrderAdd";
import OrderFind from "../../components/PersonalAccount/components/OrderFind";
import ClientAdd from "../../components/PersonalAccount/components/ClientAdd";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import ClientFind from "../../components/PersonalAccount/components/ClientFind";
import ScheduleAdd from "../../components/PersonalAccount/components/ScheduleAdd";
import EmployeeAdd from "../../components/PersonalAccount/components/EmployeeAdd";
import ScheduleFind from "../../components/PersonalAccount/components/ScheduleFind";
import EmployeeFind from "../../components/PersonalAccount/components/EmployeeFind";
import EnrollStoreClass from "../../store/enrollStore/EnrollStoreClass";
import CheckPAStoreClass from "../../store/paStore/CheckPAStoreClass";
import ServicesStoreClass from "../../store/ServicesStoreClass";
import ClientPAStoreClass from "../../store/paStore/ClientPAStoreClass";
import EmployeePAStoreClass from "../../store/paStore/EmployeePAStoreClass";
import OrderDetailsStoreClass from "../../store/enrollStore/OrderDetailsStoreClass";
import SpecialistsPAStoreClass from "../../store/paStore/SpecialistsPAStoreClass";
import ScheduleOrderStoreClass from "../../store/enrollStore/ScheduleOrderStoreClass";
import NotificationsPAStoreClass from "../../store/paStore/NotificationsPAStoreClass";
import EstablishmentPAStoreClass from "../../store/paStore/EstablishmentsPAStoreClass";
import ScheduleControlPAStoreClass from "../../store/paStore/ScheduleControlPAStoreClass";


const enrollStore = new EnrollStoreClass();
const checkStore = new CheckPAStoreClass();
const clientStore = new ClientPAStoreClass();
const employeeStore = new EmployeePAStoreClass();
const scheduleStore = new ScheduleControlPAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();
const orderDetailsStore = new OrderDetailsStoreClass();
const scheduleOrderStore = new ScheduleOrderStoreClass();
const specialistsStore = new SpecialistsPAStoreClass();
const servicesStore = new ServicesStoreClass();
const establishmentStore = new EstablishmentPAStoreClass();


const PAControl = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenAddClientForm, setIsOpenAddClientForm] = useState<boolean>(false);
  const [isOpenFindEmployeeForm, setIsOpenFindEmployeeForm] = useState<boolean>(false);
  const [isOpenAddEmployeeForm, setIsOpenAddEmployeeForm] = useState<boolean>(false);
  const [isOpenFindScheduleForm, setIsOpenFindScheduleForm] = useState<boolean>(false);
  const [isOpenAddScheduleForm, setIsOpenAddScheduleForm] = useState<boolean>(false);

  //Пока не нужно
  const [isOpenFindOrderForm, setIsOpenFindOrderClientForm] = useState<boolean>(false);
  const [isOpenAddOrderForm, setIsOpenAddOrderClientForm] = useState<boolean>(false);


  const clearAll = () => {
    notificationsStore.deleteIsSubmitOrder();
    notificationsStore.deleteNotificationsClient();
    notificationsStore.deleteNotificationsEmployee();
    notificationsStore.deleteNotificationsSchedule();
    notificationsStore.deleteNotificationsChecks();

    clientStore.deleteClient();
    employeeStore.deleteEmployee();
    employeeStore.deleteEmployees()
    scheduleStore.deleteScheduleList();
    checkStore.deleteChecks();
    enrollStore.clearStore();
    orderDetailsStore.clearStore();

    specialistsStore.deleteSpecialistsList();
    servicesStore.deleteServicesList();
    scheduleOrderStore.deleteScheduleList();
    establishmentStore.deleteEstablishmentsList();
  }

  const closeAllWindow = () => {
    clearAll();
    setIsOpenAddClientForm(false);
    setIsOpenFindClientForm(false);
    setIsOpenAddEmployeeForm(false);
    setIsOpenFindEmployeeForm(false);
    setIsOpenAddScheduleForm(false);
    setIsOpenFindScheduleForm(false);
    setIsOpenAddOrderClientForm(false);
    setIsOpenFindOrderClientForm(false);
  }

  const onClickFoundClientButton = () => {
    closeAllWindow();
    setIsOpenFindClientForm(!isOpenFindClientForm);
  }

  const onClickAddClientButton = () => {
    closeAllWindow();
    setIsOpenAddClientForm(!isOpenAddClientForm);
  }

  const onClickFoundEmployeeButton = () => {
    closeAllWindow();
    setIsOpenFindEmployeeForm(!isOpenFindEmployeeForm);
  }

  const onClickAddEmployeeButton = () => {
    closeAllWindow();
    setIsOpenAddEmployeeForm(!isOpenAddEmployeeForm);
  }

  const onClickFoundScheduleButton = () => {
    closeAllWindow();
    setIsOpenFindScheduleForm(!isOpenFindScheduleForm);
  }

  const onClickAddScheduleButton = () => {
    closeAllWindow();
    setIsOpenAddScheduleForm(!isOpenAddScheduleForm);
  }

  const onClickAddOrderButton = () => {
    closeAllWindow();
    setIsOpenAddOrderClientForm(!isOpenAddOrderForm);
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
          <CardPAUser />
          <Space
            className="personal_account_manager_control_buttons"
            direction="vertical"
            style={{ width: "100%" }}>
            <Button block onClick={onClickFoundClientButton}> <SearchOutlined /> Найти клиента </Button>
            <Button block onClick={onClickAddClientButton}> <UserAddOutlined /> Добавить клиента </Button>
            <Button block onClick={onClickFoundEmployeeButton}> <SearchOutlined /> Найти сотрудника </Button>
            <Button block onClick={onClickAddEmployeeButton}> <UserAddOutlined /> Добавить сотрудника </Button>
            <Button block onClick={onClickFoundScheduleButton}> <SearchOutlined /> Посмотреть расписание </Button>
            <Button block onClick={onClickAddScheduleButton}> <FileAddOutlined /> Добавить расписание </Button>
            <Button block onClick={onClickFindOrderButton}> <SearchOutlined /> Найти заказ </Button>
            <Button block onClick={onClickAddOrderButton}> <FileAddOutlined /> Добавить заказ </Button>
          </Space>
        </Col>

        <Col
          className="personal_account_control_forms"
          span={20}
        >
          {isOpenFindClientForm &&
            <ClientFind
              notificationsStore={notificationsStore}
              clientStore={clientStore}
              isUpdateClient={true}
            />
          }
          {isOpenAddClientForm &&
            <ClientAdd notificationsStore={notificationsStore} />
          }
          {isOpenFindEmployeeForm &&
            <EmployeeFind
              employeeStore={employeeStore}
              notificationsStore={notificationsStore}
              isUpdateEmployee={true}
            />
          }
          {isOpenAddEmployeeForm &&
            <EmployeeAdd notificationsStore={notificationsStore} />
          }
          {isOpenFindScheduleForm &&
            <ScheduleFind
              notificationsStore={notificationsStore}
              employeeStore={employeeStore}
              scheduleStore={scheduleStore}
            />
          }
          {isOpenAddScheduleForm &&
            <ScheduleAdd notificationsStore={notificationsStore} />
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
              scheduleStore={scheduleOrderStore}
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
}


export default PAControl;