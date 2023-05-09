import '../../style/css/personal_account/paControl.css';
import { useEffect, useState } from "react";
import { Button, Col, Row, Space } from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import ClientAdd from "../../components/PersonalAccount/components/ClientAdd";
import ClientFind from "../../components/PersonalAccount/components/ClientFind";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import CheckPAStoreClass from "../../store/CheckPAStoreClass";
import ClientPAStoreClass from "../../store/ClientPAStoreClass";
import NotificationsPAStoreClass from "../../store/NotificationsPAStoreClass";


const clientStore = new ClientPAStoreClass();
const checkStore = new CheckPAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();


const PAControl = () => {
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenAddClientForm, setIsOpenAddClientForm] = useState<boolean>(false);
  const [isOpenFindEmployeeForm, setIsOpenFindEmployeeForm] = useState<boolean>(false);

  const [isOpenFindOrderForm, setIsOpenFindOrderClientForm] = useState<boolean>(false);
  const [isOpenAddOrderForm, setIsOpenAddOrderClientForm] = useState<boolean>(false);


  const loadingPage = async () => {
    // await ScheduleServices.getScheduleByEmployeeId(14)
    //   .then(() => {
    setIsLoader(true);
    // })
    //Обработка ошибки
  }


  const clearAll = () => {
    notificationsStore.deleteNotificationsChecks();
    notificationsStore.deleteNotificationsClient();
    notificationsStore.deleteIsSubmitOrder();

    clientStore.deleteClient();
    // checkStore.deleteChecks();
    // enrollStore.clearStore();
    // orderDetailsStore.clearStore();

    // specialistsStore.deleteSpecialistsList();
    // servicesStore.deleteServicesList();
    // scheduleStore.deleteScheduleListBySpecialist();
  }


  const onClickFoundClientButton = () => {
    clearAll();
    setIsOpenAddClientForm(false);
    setIsOpenFindEmployeeForm(false);
    // setIsOpenAddOrderClientForm(false);
    // setIsOpenFindOrderClientForm(false);
    setIsOpenFindClientForm(!isOpenFindClientForm);
  }

  const onClickAddClientButton = () => {
    clearAll();
    setIsOpenFindClientForm(false);
    setIsOpenFindEmployeeForm(false);
    // setIsOpenAddOrderClientForm(false);
    // setIsOpenFindOrderClientForm(false);
    setIsOpenAddClientForm(!isOpenAddClientForm);
  }

  const onClickFoundEmployeeButton = () => {
    clearAll();
    setIsOpenAddClientForm(false);
    setIsOpenFindClientForm(false);
    // setIsOpenAddOrderClientForm(false);
    // setIsOpenFindOrderClientForm(false);
    setIsOpenFindEmployeeForm(!isOpenFindEmployeeForm);
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


  useEffect(() => {
    if (!isLoader) {
      // loadingPage();
    }
  }, [isLoader])


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
            {/* <Button block onClick={onClickAddEmployeeButton}> <UserAddOutlined /> Добавить сотрудника </Button> */}
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
            <ClientAdd notificationsStore={notificationsStore} />
          }
          {/* {isOpenFindOrderForm &&
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
          } */}
        </Col>
      </Row>
    </div>
  )
}


export default PAControl;