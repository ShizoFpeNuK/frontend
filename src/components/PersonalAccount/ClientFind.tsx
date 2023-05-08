import { observer } from "mobx-react";
import { Button, Col, Row } from "antd";
import CardPAClient from "./cards/CardPAClient";
import ResultSuccess from "../Results/ResultSuccess";
import ClientServices from "../../services/client.service";
import FormClientFind from "./forms/FormClientFind";
import ClientPAStoreClass from "../../store/ClientPAStoreClass";
import NotificationsPAStoreClass from "../../store/NotificationsPAStoreClass";
import ResultErrorNotCorrectData from "../Results/ResultErrorNotCorrectData";


interface ClientFindProps {
  clientStore: ClientPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}


const ClientFind = observer(({ notificationsStore, clientStore }: ClientFindProps) => {

  const handlerDeleteClient = async () => {
    await ClientServices.deleteClient(clientStore.client!.client_id);
    clientStore.deleteClient();
    notificationsStore?.setIsDeleteClient(true);
  }


  return (
    <div className="personal_account_forms_client">
      <h2 className="personal_account_forms_client_title title--border"> Найти клиента </h2>
      <Row
        justify={'space-between'}
        className="personal_account_forms_client_row"
      >
        <Col className="personal_account_client_form" span={6}>
          <FormClientFind
            notificationsStore={notificationsStore}
            // isOrder={false}
            clientStore={clientStore}
          />
        </Col>
        <Col className="personal_account_client_result" span={6}>
          {clientStore.client &&
            <CardPAClient title="Клиент" client={clientStore.client}>
              <Button
                className="personal_account_client_result_button"
                block
                onClick={handlerDeleteClient}
              >
                Удалить
              </Button>
            </CardPAClient>
          }
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