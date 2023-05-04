import '../style/css/personal_account/personalAccount.css';
import { observer } from "mobx-react";
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Button, Col, Row, Space } from "antd";
import { FileAddOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import Order from "../components/OrderComponents/Order";
import CardBase from "../components/PersonalAccount/CardBase";
import CardClient from "../components/PersonalAccount/CardClient";
import loginStore from "../store/LoginStoreClass";
import enrollStore from '../store/EnrollStoreClass';
import clientStore from "../store/ClientStoreClass";
import scheduleStore from "../store/ScheduleStoreClass";
import servicesStore from "../store/ServicesStoreClass";
import FormAddClient from "../components/PersonalAccount/FormAddClient";
import ClientServices from "../services/client.service";
import FormFindClient from "../components/PersonalAccount/FormFindClient";
import specialistsStore from "../store/SpecialistsStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";


const PersonalAccount = observer(() => {
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenAddClientForm, setIsOpenAddClientForm] = useState<boolean>(false);
  const [isOpenAddOrderForm, setIsOpenOrderClientForm] = useState<boolean>(false);


  if (!loginStore.isLogin) {
    return <Navigate to="/auth" />
  }


  const clearAll = () => {
    enrollStore.clearStore();
    orderDetailsStore.clearStore();
    specialistsStore.deleteSpecialistsList();
    servicesStore.deleteServicesList();
    scheduleStore.deleteScheduleListBySpecialist();

    clientStore.deleteClient();
  }


  const onClickButtonLogout = () => {
    loginStore.setIsLogin(false);
  }

  const onClickDeleteClientButton = async () => {
    await ClientServices.deleteClient(clientStore.client!.client_id);
    clientStore.deleteClient();
  }

  const onClickFoundClientButton = () => {
    clearAll();
    setIsOpenAddClientForm(false);
    setIsOpenOrderClientForm(false);
    setIsOpenFindClientForm(!isOpenFindClientForm);
  }

  const onClickAddClientButton = () => {
    clearAll();
    setIsOpenFindClientForm(false);
    setIsOpenOrderClientForm(false);
    setIsOpenAddClientForm(!isOpenAddClientForm);
  }

  const onClickAddOrderButton = () => {
    clearAll();
    setIsOpenAddClientForm(false);
    setIsOpenFindClientForm(false);
    setIsOpenOrderClientForm(!isOpenAddOrderForm);
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
            <Button block onClick={onClickAddOrderButton}> <FileAddOutlined /> Добавить заказ </Button>
          </Space>
        </Col>

        {!isOpenAddOrderForm
          //Клиент
          ? <Col className="personal_account_forms" span={20}>
            <Row justify={'space-between'} className="personal_account_forms_row">
              <Col className="personal_account_forms_form" span={6}>
                {isOpenFindClientForm &&
                  <FormFindClient isOrder={false} />
                }
                {isOpenAddClientForm &&
                  <FormAddClient />
                }
              </Col>
              <Col className="personal_account_result" span={6}>
                {isOpenFindClientForm && clientStore.client &&
                  <CardClient title="Клиент" info={clientStore.client}>
                    <Button
                      className="personal_account_info_inner_button"
                      block
                      onClick={onClickDeleteClientButton}
                    >
                      Удалить
                    </Button>
                  </CardClient>
                }
              </Col>
            </Row>
          </Col>

          //Заказ
          : <Col className="personal_account_order" span={20}>
            <Order />
          </Col>
        }
      </Row>
    </div>
  )
});


export default PersonalAccount;