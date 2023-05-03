import '../style/css/personalAccount.css';
import { observer } from "mobx-react";
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { CardBase } from "../components/PersonalAccountForms/CardBase";
import { ListDates } from "../components/ListDates";
import { CardClient } from "../components/PersonalAccountForms/CardClient";
import { OrderDetails } from "../components/OrderDetails";
import { ListServices } from "../components/ListServices";
import { AddClientForm } from '../components/PersonalAccountForms/AddClientForm';
import { FindClientForm } from '../components/PersonalAccountForms/FindClientForm';
import { ListSpecialists } from "../components/ListSpecialists";
import { Button, Col, Row, Space } from "antd";
import { FileAddOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import loginStore from "../store/LoginStoreClass";
import clientStore from "../store/ClientStoreClass";
import enrollStore from "../store/EnrollStoreClass";
import ClientServices from "../services/client.service";


export const PersonalAccount = observer(() => {
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenAddClientForm, setIsOpenAddClientForm] = useState<boolean>(false);
  const [isOpenAddOrderForm, setIsOpenOrderClientForm] = useState<boolean>(false);


  if (!loginStore.isLogin) {
    return <Navigate to="/auth" />
  }


  const onClickButtonLogout = () => {
    loginStore.setIsLogin(false);
  }

  const onClickDeleteClientButton = async () => {
    await ClientServices.deleteClient(clientStore.client!.client_id);
    clientStore.deleteClient();
  }


  const onClickFoundClientButton = () => {
    setIsOpenAddClientForm(false);
    setIsOpenOrderClientForm(false);
    setIsOpenFindClientForm(!isOpenFindClientForm);
  }

  const onClickAddClientButton = () => {
    clientStore.deleteClient();
    setIsOpenFindClientForm(false);
    setIsOpenOrderClientForm(false);
    setIsOpenAddClientForm(!isOpenAddClientForm);
  }

  const onClickAddOrderButton = () => {
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
        </Col>

        {/* Кнопки управления */}
        <Col className="personal_account_control_buttons" span={4}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button block onClick={onClickFoundClientButton}> <SearchOutlined /> Найти клиента </Button>
            <Button block onClick={onClickAddClientButton}> <UserAddOutlined /> Добавить клиента </Button>
            <Button block onClick={onClickAddOrderButton}> <FileAddOutlined /> Добавить заказ </Button>
          </Space>
        </Col>

        {!isOpenAddOrderForm
          //Клиент
          ? <Col className="personal_account_forms" span={6}>
            {isOpenFindClientForm &&
              <FindClientForm isOrder={false} />
            }
            {isOpenAddClientForm &&
              <AddClientForm />
            }
          </Col>

          //Заказ
          : <Col className="personal_account_enroll" span={16}>
            <Row className="personal_account_enroll_row">
              {enrollStore.isSubmitOrder &&
                <Col className="enroll_list_message" span={16}>
                  Нажмите кнопку "Записаться", чтобы создать запись в нашу парикмахерскую.
                </Col>
              }

              {enrollStore.isOpenFormFindClient &&
                <Col className="personal_account_forms" style={{paddingLeft: 0}} span={10}>
                  <FindClientForm isOrder={true} />
                </Col>
              }


              {enrollStore.isOpenListSpecialist &&
                <Col className="enroll_list_specialists" span={16}>
                  <ListSpecialists />
                </Col>
              }

              {enrollStore.isOpenListServices &&
                <Col className="enroll_list_services" span={16}>
                  <ListServices />
                </Col>
              }

              {enrollStore.isOpenListDate &&
                <Col className="enroll_list_dates" span={16}>
                  <ListDates />
                </Col>
              }

              <Col className="enroll_order" span={8}>
                {/* <Row className="enroll_order_row">
                  <Col className="enroll_order_form" span={24}>
                    <OrderForm />
                  </Col>
                </Row>
                <Row className="enroll_order_row"> */}
                <Col className="enroll_order_details" span={24}>
                  <OrderDetails />
                </Col>
                {/* </Row> */}
              </Col>
            </Row>
          </Col>
        }

        {/* Вывод */}
        <Col className="personal_account_result" span={4}>
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
    </div>
  )
});