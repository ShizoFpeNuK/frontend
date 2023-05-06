import { IClient } from "../../options/model/client.model";
import { observer } from "mobx-react";
import { useState } from "react";
import { Button, Col, Row } from "antd";
import CardClient from "./CardClient";
import ResultSuccess from "../Results/ResultSuccess";
import ClientServices from "../../services/client.service";
import FormClientFind from "./FormClientFind";
import notificationsStore from "../../store/NotificationsStoreClass";
import ResultErrorNotCorrectData from "../Results/ResultErrorNotCorrectData";
import clientStore from "../../store/ClientStoreClass";


interface ClientFindProps {
  notifications?: boolean,
}


const ClientFind = observer(({ notifications }: ClientFindProps) => {
  const [client, setClient] = useState<IClient | null>(null);


  const onClickDeleteClientButton = async () => {
    // await ClientServices.deleteClient(clientStore.client!.client_id);
    await ClientServices.deleteClient(client!.client_id);
    setClient(null);
    // clientStore.deleteClient();
    notificationsStore.setIsDeleteClient(true);
  }

  const getClient = (client: IClient) => {
    setClient(client);
  }

  const deleteClient = () => {
    setClient(null);
  }


  return (
    <div className="personal_account_forms_client">
      <h2 className="personal_account_forms_client_title title--border"> Найти клиента </h2>
      <Row justify={'space-between'} className="personal_account_forms_client_row">
        <Col className="personal_account_client_form" span={6}>
          <FormClientFind notifications={notifications ?? false} isOrder={false} getClient={getClient} deleteClient={deleteClient}/>
        </Col>
        <Col className="personal_account_client_result" span={6}>
          {/* {clientStore.client && */}
          {client &&
            // <CardClient title="Клиент" info={clientStore.client}>
            <CardClient title="Клиент" info={client}>
              <Button
                className="personal_account_client_result_button"
                block
                onClick={onClickDeleteClientButton}
              >
                Удалить
              </Button>
            </CardClient>
          }
          {notificationsStore.isNotFindClient &&
            <ResultErrorNotCorrectData title="Клиент не был найден" />
          }
          {notificationsStore.isDeleteClient &&
            <ResultSuccess title="Клиент был успешно удалён" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default ClientFind;