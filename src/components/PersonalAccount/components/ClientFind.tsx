import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { IClient, IClientUpdate } from "../../../options/model/client.model";
import { Button, Col, Row, Space } from "antd";
import CardPAClient from "../cards/CardPAClient";
import ResultSuccess from "../../Results/ResultSuccess";
import ClientServices from "../../../services/client.service";
import FormClientFind from "../forms/FormClientFind";
import ModalUpdateClient from "../modals/ModalUpdateClient";
import ClientPAStoreClass from "../../../store/paStore/ClientPAStoreClass";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


const clientStore = new ClientPAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();

interface ClientFindProps {
  isUpdateClient?: boolean,
}


const ClientFind = observer((props: ClientFindProps) => {
  const [form] = useForm();


  const handlerGetClients = async () => {
    notificationsStore?.deleteNotificationsClient();
    clientStore.deleteClient();
    clientStore.deleteClients();
    const clients: IClient[] = await ClientServices.getAll();
    clientStore.setClients(clients);
  }

  const onFinish = async (values: IClientUpdate) => {
    const correctValue: IClientUpdate = {
      ...values,
      "full_name": values["full_name"]?.length ? values["full_name"] : clientStore.client!.full_name,
      "telephone": values["telephone"]?.length ? values["telephone"] : clientStore.client!.telephone,
      "email": values["email"]?.length ? values["email"] :
        values["email"] !== undefined ? undefined : clientStore.client!.email,
    }

    await ClientServices.updateClient(clientStore.client!.client_id, correctValue)
      .then(async () => {
        const client = await ClientServices.getClient(clientStore.client!.client_id);
        clientStore.setClient(client);
      })
  }

  const handlerUpdateClient = (client: IClientUpdate) => {
    ModalUpdateClient(form, client, onFinish);
  };

  const handlerDeleteClient = async () => {
    await ClientServices.deleteClient(clientStore.client!.client_id);
    clientStore.deleteClient();
    notificationsStore?.setIsDeleteClient(true);
  }


  useEffect(() => {
    return () => {
      clientStore.deleteClient();
      clientStore.deleteClients();
      notificationsStore.deleteNotificationsClient();
    }
  }, [])


  return (
    <div className="client_find">
      <h2 className="client_find_title title--border"> Найти клиента </h2>
      <Row
        justify={'space-between'}
        className="client_find_row"
      >
        <Col
          className="client_find_form"
          span={6}
          style={{ paddingRight: "20px" }}
        >
          <FormClientFind
            notificationsStore={notificationsStore}
            clientStore={clientStore}
          />
          <Button
            block
            style={{ marginTop: "10px" }}
            onClick={handlerGetClients}
          >
            Найти всех
          </Button>
        </Col>
        <Col
          className="client_find_result"
          span={18}
          style={{ paddingLeft: "20px" }}
        >
          {clientStore.client && clientStore.clients.length === 0 &&
            <CardPAClient
              title="Клиент"
              client={clientStore.client}
            >
              {props.isUpdateClient &&
                <Button
                  block
                  onClick={() => handlerUpdateClient(clientStore.client!)}
                  style={{ marginBottom: "10px" }}
                >
                  Изменить
                </Button>
              }
              <Button
                block
                onClick={handlerDeleteClient}
              >
                Удалить
              </Button>
            </CardPAClient>
          }
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {clientStore.clients.map((client: IClient) =>
              <CardPAClient
                title="Сотрудник"
                client={client}
              >
                {props.isUpdateClient &&
                  <Button
                    block
                    // onClick={() => handlerUpdateEmployees(client)}
                    style={{ marginBottom: "10px" }}
                  >
                    Изменить
                  </Button>
                }
                <Button
                  block
                  // onClick={() => handlerDeleteEmployees(client)}
                >
                  Удалить
                </Button>
              </CardPAClient>
            )}
          </Space>

          {notificationsStore?.isNotFindClient &&
            <ResultErrorNotCorrectData title="Клиент не был найден" />
          }
          {notificationsStore?.isDeleteClient &&
            <ResultSuccess title="Клиент был успешно удалён" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default ClientFind;