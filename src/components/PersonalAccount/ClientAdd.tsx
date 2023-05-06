import { observer } from "mobx-react";
import { Col, Row } from "antd";
import FormClientAdd from "./FormClientAdd";
import ResultSuccess from "../Results/ResultSuccess";
import notificationsStore from "../../store/NotificationsStoreClass";
import ResultErrorConflict from "../Results/ResultErrorConflict";


interface ClientAddProps {
  notifications?: boolean,
}


const ClientAdd = observer(({ notifications }: ClientAddProps) => {
  return (
    <div className="personal_account_forms_client">
      <h2 className="personal_account_forms_client_title title--border"> Добавить клиента </h2>
      <Row justify={'space-between'} className="personal_account_forms_client_row">
        <Col className="personal_account_client_form" span={6}>
          <FormClientAdd notifications={notifications ?? false} />
        </Col>
        <Col className="personal_account_client_result" span={6}>
          {notificationsStore.isCreateClient &&
            <ResultSuccess title="Клиент успешно создан!" />
          }
          {notificationsStore.isConflictClient &&
            <ResultErrorConflict title="Такой клиент уже создан!" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default ClientAdd;