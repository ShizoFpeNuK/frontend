import { ICheck } from "../../options/model/check.model";
import { IClient } from "../../options/model/client.model";
import { observer } from "mobx-react";
import { Col, Row, Space } from "antd";
import { useEffect, useState } from "react";
import CardCheck from "./CardCheck";
import CheckServices from "../../services/check.service";
import FormOrderFind from "./FormOrderFind";
import ClientServices from "../../services/client.service";
import FormClientFind from "./FormClientFind";
import notificationsStore from "../../store/NotificationsStoreClass";
import ResultSuccessNoData from "../Results/ResultSuccessNoData";
import ResultErrorNotCorrectData from "../Results/ResultErrorNotCorrectData";


interface OrderFindProps {
  notifications?: boolean,
}


const OrderFind = observer(({ notifications }: OrderFindProps) => {
  const [checks, setChecks] = useState<ICheck[]>([]);
  const [client, setClient] = useState<IClient | null>(null);
  const [isDeleteCheck, setIsDeleteCheck] = useState<boolean>(false);
  const [isPaidCheck, setIsPaidCheck] = useState<boolean>(false);


  const getChecksAfterDelete = () => {
    CheckServices.getChecks(client!.client_id)
      .then((checks: ICheck[]) => {
        if (notifications && !checks.length) {
          notificationsStore.setIsEmptyChecks(true);
        }
        setChecks(checks);
      });
  }

  const getClient = (client: IClient) => {
    setClient(client);
  }

  const deleteClient = () => {
    setClient(null);
  }

  const getChecks = (checks: ICheck[]) => {
    setChecks(checks);
  }

  const handlerDeleteCheck = (boolean: boolean) => {
    setIsDeleteCheck(boolean);
  }

  const handlerPaidCheck = (boolean: boolean) => {
    setIsPaidCheck(boolean);
  }

  useEffect(() => {
    if (isDeleteCheck) {
      getChecksAfterDelete();
      setIsDeleteCheck(false);
    }
    if (isPaidCheck) {
      getChecksAfterDelete();
      ClientServices.getClientById(client!.client_id)
      .then((client: IClient) => {
        setClient(client);
        setIsPaidCheck(false);
      })
    }
  }, [isPaidCheck, isDeleteCheck, checks])

  return (
    <div className="personal_account_forms_order">
      <h2 className="personal_account_forms_order_title title--border"> Найти заказ </h2>
      <Row
        className="personal_account_forms_order_row"
        justify={'space-between'}
        wrap={false}>
        <Col className="personal_account_order_form" span={6}>
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
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {checks.map((check: ICheck) =>
              <CardCheck
                check={check}
                bonus={client!.bonus}
                clientId={client!.client_id}
                key={check.check_id}
                setDeleteCheckFlag={handlerDeleteCheck}
                setPaidCheckFlag={handlerPaidCheck}
              />
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