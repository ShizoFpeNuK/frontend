import { observer } from "mobx-react";
import { Col, Row } from "antd";
import clientStore from "../../store/ClientStoreClass";
import FormAddClient from "./FormAddClient";
import ResultSuccess from "../Results/ResultSuccess";
import ResultErrorConflict from "../Results/ResultErrorConflict";


interface AddClientProps {
  notifications?: boolean,
}


const AddClient = observer(({ notifications }: AddClientProps) => {
  return (
    <Row justify={'space-between'} className="personal_account_forms_row">
      <Col className="personal_account_client_forms" span={6}>
        <FormAddClient notifications={notifications ?? false} />
      </Col>
      <Col className="personal_account_result" span={6}>
        {clientStore.isCreateClient &&
          <ResultSuccess title="Клиент успешно создан!" />
        }
        {clientStore.isConflictClient &&
          <ResultErrorConflict title="Такой клиент уже создан!" />
        }
      </Col>
    </Row>
  )
});


export default AddClient;