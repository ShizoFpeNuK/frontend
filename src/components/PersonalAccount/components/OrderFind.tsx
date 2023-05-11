import { ICheck } from "../../../options/model/check.model";
import { IClient } from "../../../options/model/client.model";
import { observer } from "mobx-react";
import { Col, Row, Space } from "antd";
import { useEffect, useState } from "react";
import CardCheck from "../cards/CardCheck";
import CheckServices from "../../../services/check.service";
import FormOrderFind from "../forms/FormOrderFind";
import ClientServices from "../../../services/client.service";
import FormClientFind from "../forms/FormClientFind";
import CheckPAStoreClass from "../../../store/paStore/CheckPAStoreClass";
import ClientPAStoreClass from "../../../store/paStore/ClientPAStoreClass";
import ResultSuccessNoData from "../../Results/ResultSuccessNoData";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface OrderFindProps {
  checkStore: CheckPAStoreClass,
  clientStore: ClientPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}


const OrderFind = observer(({ clientStore, notificationsStore, checkStore }: OrderFindProps) => {
  const [isPaidCheck, setIsPaidCheck] = useState<boolean>(false);
  const [isDeleteCheck, setIsDeleteCheck] = useState<boolean>(false);


  const getChecksAfterDelete = () => {
    CheckServices.getChecks(clientStore.client!.client_id)
      .then((checks: ICheck[]) => {
        if (!checks.length) {
          notificationsStore?.setIsEmptyChecks(true);
        }
        checkStore.setChecks(checks);
      });
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
      ClientServices.getClient(clientStore.client!.client_id)
        .then((client: IClient) => {
          clientStore.setClient(client);
          setIsPaidCheck(false);
        })
    }
  }, [isPaidCheck, isDeleteCheck])


  return (
    <div className="personal_account_forms_order">
      <h2 className="personal_account_forms_order_title title--border"> Найти заказ </h2>
      <Row
        className="personal_account_forms_order_row"
        justify={'space-between'}
        wrap={false}>
        <Col
          className="personal_account_order_form"
          span={6}
          style={{paddingRight: "20px"}}
        >
          {!clientStore.client
            ? <FormClientFind
              clientStore={clientStore}
              notificationsStore={notificationsStore}
            />
            : <FormOrderFind
              clientStore={clientStore}
              checkStore={checkStore}
              notificationsStore={notificationsStore}
            />
          }
        </Col>
        <Col className="personal_account_order_result" span={18}>
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {checkStore.checks.map((check: ICheck) =>
              <CardCheck
                check={check}
                bonus={clientStore.client!.bonus}
                clientId={clientStore.client!.client_id}
                key={check.check_id}
                setDeleteCheckFlag={handlerDeleteCheck}
                setPaidCheckFlag={handlerPaidCheck}
              />
            )}
          </Space>


          {notificationsStore?.isNotFindClient &&
            <ResultErrorNotCorrectData title="Клиент не был найден" />
          }
          {notificationsStore?.isEmptyChecks &&
            <ResultSuccessNoData subTitle="У клиента нет заказов" />
          }
          {notificationsStore?.isNotFindChecks &&
            <ResultErrorNotCorrectData title="Заказы не были найдены" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default OrderFind;