import '../style/css/personal_account/personalAccount.css';
import { ICheck } from "../options/model/check.model";
import { observer } from "mobx-react";
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { Button, Col, Row, Space } from "antd";
import { FileAddOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import Order from "../components/OrderComponents/Order";
import CardBase from "../components/PersonalAccount/CardBase";
import CardCheck from "../components/PersonalAccount/CardCheck";
import checkStore from "../store/CheckStoreClass";
import CardClient from "../components/PersonalAccount/CardClient";
import loginStore from "../store/LoginStoreClass";
import enrollStore from '../store/EnrollStoreClass';
import clientStore from "../store/ClientStoreClass";
import ResultSuccess from "../components/Results/ResultSuccess";
import scheduleStore from "../store/ScheduleStoreClass";
import servicesStore from "../store/ServicesStoreClass";
import FormAddClient from "../components/PersonalAccount/FormAddClient";
import FormFindOrder from "../components/PersonalAccount/FormFindOrder";
import ClientServices from "../services/client.service";
import FormFindClient from "../components/PersonalAccount/FormFindClient";
import specialistsStore from "../store/SpecialistsStoreClass";
import orderDetailsStore from "../store/OrderDetailsStoreClass";
import ResultErrorConflict from "../components/Results/ResultErrorConflict";
import ResultSuccessNoData from "../components/Results/ResultSuccessNoData";
import ResultErrorNotCorrectData from "../components/Results/ResultErrorNotCorrectData";
import FindClient from '../components/PersonalAccount/FindClient';
import AddClient from '../components/PersonalAccount/AddClient';


const PersonalAccount = observer(() => {
  const [isOpenFindClientForm, setIsOpenFindClientForm] = useState<boolean>(false);
  const [isOpenAddClientForm, setIsOpenAddClientForm] = useState<boolean>(false);
  const [isOpenAddOrderForm, setIsOpenAddOrderClientForm] = useState<boolean>(false);
  const [isOpenFindOrderForm, setIsOpenFindOrderClientForm] = useState<boolean>(false);


  if (!loginStore.isLogin) {
    return <Navigate to="/auth" />
  }


  const clearAll = () => {
    enrollStore.clearStore();
    orderDetailsStore.clearStore();
    specialistsStore.deleteSpecialistsList();
    servicesStore.deleteServicesList();
    scheduleStore.deleteScheduleListBySpecialist();

    clientStore.clearStore();

    checkStore.deleteChecks();
    checkStore.deleteIsNotFindChecks();
    checkStore.deleteIsEmptyChecks();
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

        {/* <Col className="personal_account_client" span={20}>
          {isOpenFindClientForm &&
            <FindClient notifications={true} />
          }
          {isOpenAddClientForm &&
            <AddClient notifications={true} />
          }
        </Col> */}


        {!isOpenAddOrderForm && !isOpenFindOrderForm
          //Клиент
          ? <Col className="personal_account_client" span={20}>
            <Row justify={'space-between'} className="personal_account_forms_row">
              <Col className="personal_account_client_forms" span={6}>
                {isOpenFindClientForm &&
                  <FormFindClient notifications={true} isOrder={false} />
                }
                {isOpenAddClientForm &&
                  <FormAddClient notifications={true} />
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
                {clientStore.isNotFindClient &&
                  <ResultErrorNotCorrectData title="Клиент не был найден" />
                }
                {clientStore.isCreateClient &&
                  <ResultSuccess title="Клиент успешно создан!" />
                }
                {clientStore.isConflictClient &&
                  <ResultErrorConflict title="Такой клиент уже создан!" />
                }
              </Col>
            </Row>
          </Col>

          //Заказ
          : <Col className="personal_account_order" span={20}>
            {isOpenAddOrderForm
              ? <Order />
              : <Row className="personal_account_order_forms_row" justify={'space-between'} wrap={false}>
                <Col className="personal_account_order_form" span={6}>
                  {!clientStore.client
                    ? <FormFindClient notifications={false} isOrder={false} />
                    : <FormFindOrder info={clientStore.client} />
                  }
                </Col>
                <Col>
                  <Space wrap={true} direction="horizontal" size={[20, 20]} style={{ width: "100%" }}>
                    {checkStore.checks.map((check: ICheck) =>
                      <CardCheck check={check} key={check.check_id} />
                    )}
                  </Space>
                  {checkStore.isEmptyChecks &&
                    <ResultSuccessNoData subTitle="У клиента нет заказов." />
                  }
                  {clientStore.isNotFindClient &&
                    <ResultErrorNotCorrectData title="Клиент не был найден" />
                  }
                  {checkStore.isNotFindChecks &&
                    <ResultErrorNotCorrectData title="Заказы не были найдены" />
                  }
                </Col>
              </Row>
            }
          </Col>
        }
      </Row>
    </div>
  )
});


export default PersonalAccount;