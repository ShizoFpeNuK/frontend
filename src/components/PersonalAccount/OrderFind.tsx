import { ICheck } from "../../options/model/check.model";
import { IClient } from "../../options/model/client.model";
import { observer } from "mobx-react";
import { useState } from "react";
import { Col, Row, Space } from "antd";
import CardCheck from "./CardCheck";
import FormOrderFind from "./FormOrderFind";
import FormClientFind from "./FormClientFind";
import notificationsStore from "../../store/NotificationsStoreClass";
import ResultSuccessNoData from "../Results/ResultSuccessNoData";
import ResultErrorNotCorrectData from "../Results/ResultErrorNotCorrectData";
import checkStore from "../../store/CheckStoreClass";
import clientStore from "../../store/ClientStoreClass";


interface OrderFindProps {
  notifications?: boolean,
}


const OrderFind = observer(({ notifications }: OrderFindProps) => {
  const [client, setClient] = useState<IClient | null>(null);
  const [checks, setChecks] = useState<ICheck[]>([]);

  const getClient = (client: IClient) => {
    setClient(client);
  }

  const deleteClient = () => {
    setClient(null);
  }

  const getChecks = (checks: ICheck[]) => {
    setChecks(checks);
  }


  return (
    <div className="personal_account_forms_order">
      <h2 className="personal_account_forms_order_title title--border"> Найти заказ </h2>
      <Row
        className="personal_account_forms_order_row"
        justify={'space-between'}
        wrap={false}>
        <Col className="personal_account_order_form" span={6}>
          {/* {!clientStore.client */}
          {!client
            ? <FormClientFind
              notifications={notifications ?? false}
              isOrder={false}
              getClient={getClient}
              deleteClient={deleteClient}
            />
            : <FormOrderFind
              notifications={notifications ?? false}
              client={client}
              getChecks={getChecks}
              deleteClient={deleteClient}
            />
          }
        </Col>
        <Col className="personal_account_order_result">
          <Space
            wrap={true}
            direction="horizontal"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {/* {checkStore.checks.map((check: ICheck) => */}
            {checks.map((check: ICheck) =>
              <CardCheck check={check} clientId={client!.client_id} key={check.check_id} getChecks={getChecks}/>
            )}
          </Space>

          {notificationsStore.isNotFindClient &&
            <ResultErrorNotCorrectData title="Клиент не был найден" />
          }
          {notificationsStore.isEmptyChecks &&
            <ResultSuccessNoData subTitle="У клиента нет заказов" />
          }
          {notificationsStore.isNotFindChecks &&
            <ResultErrorNotCorrectData title="Заказы не были найдены" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default OrderFind;