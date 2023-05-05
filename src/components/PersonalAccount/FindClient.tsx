import { observer } from "mobx-react";
import { Button, Col, Row } from "antd";
import CardClient from "./CardClient";
import clientStore from "../../store/ClientStoreClass";
import ResultSuccess from "../Results/ResultSuccess";
import ClientServices from "../../services/client.service";
import FormFindClient from "./FormFindClient";
import ResultErrorNotCorrectData from "../Results/ResultErrorNotCorrectData";


interface FindClientProps {
  notifications?: boolean,
}


const FindClient = observer(({ notifications }: FindClientProps) => {

  const onClickDeleteClientButton = async () => {
    await ClientServices.deleteClient(clientStore.client!.client_id);
    clientStore.deleteClient();
    clientStore.setIsDeleteClient(true);
  }


  return (
    <Row justify={'space-between'} className="personal_account_forms_row">
      <Col className="personal_account_client_forms" span={6}>
        <FormFindClient notifications={notifications ?? false} isOrder={false} />
      </Col>
      <Col className="personal_account_result" span={6}>
        {clientStore.client &&
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
        {clientStore.isDeleteClient &&
          <ResultSuccess title="Клиент был успешно удалён" />
        }
      </Col>
    </Row>
  )
});


export default FindClient;