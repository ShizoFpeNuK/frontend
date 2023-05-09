import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { ClientUpdate } from "../../../options/model/client.model";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import CardPAClient from "../cards/CardPAClient";
import ResultSuccess from "../../Results/ResultSuccess";
import ClientServices from "../../../services/client.service";
import FormClientFind from "../forms/FormClientFind";
import ClientPAStoreClass from "../../../store/ClientPAStoreClass";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";
import NotificationsPAStoreClass from "../../../store/NotificationsPAStoreClass";


interface ClientFindProps {
  clientStore: ClientPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
  isUpdateClient?: boolean,
}


const ClientFind = observer(({ notificationsStore, clientStore, ...props }: ClientFindProps) => {
  const [form] = useForm();

  const onFinish = async (values: ClientUpdate) => {
    const correctValue: ClientUpdate = {
      ...values,
      "full_name": values["full_name"] ?? clientStore.client!.full_name,
      "telephone": values["telephone"] ?? clientStore.client!.telephone,
      "email": values["email"] ?? clientStore.client!.email,
    }

    await ClientServices.updateClient(clientStore.client!.client_id, correctValue)
      .then(async () => {
        const client = await ClientServices.getClientById(clientStore.client!.client_id)
        clientStore.setClient(client)
      })
  }

  const handlerUpdateClient = async () => {
    Modal.confirm({
      className: "modal_update_client",
      icon: null,
      centered: true,
      okText: "Изменить",
      cancelText: "Назад",
      content: (
        <Form layout="vertical"
          form={form}
          preserve={false}
          style={{ width: "100%" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="ФИО клиента"
            name="full_name"
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Только русские буквы, пробелы между словами и дефисы"
              }
            ]}
          >
            <Input
              defaultValue={clientStore.client!.full_name}
              placeholder="Например, Иванов Иван Иваныч"
            />
          </Form.Item>
          <Form.Item
            label="Номер телефона"
            name="telephone"
            rules={[
              {
                pattern: new RegExp(/^\+7\s[\(]9\d{2}[\)]\s\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/),
                message: "Пример ввода: +7 (916) 419-52-28"
              }
            ]}
          >
            <Input
              defaultValue={clientStore.client!.telephone}
              placeholder="Например, +7 (999) 999-99-99"
            />
          </Form.Item>
          <Form.Item
            label="Электронная почта"
            name="email"
            rules={[
              {
                pattern: new RegExp(/^[a-zA-Z\d]+\@[a-z]+\.[a-z]+$/),
                message: "Неправильный вид почты"
              }
            ]}
          >
            <Input
              defaultValue={clientStore.client!.email}
              placeholder="Например, barbershop@gmail.com"
            />
          </Form.Item>
        </Form>
      ),
      async onOk() {
        form.submit();
      }
    });
  };

  const handlerDeleteClient = async () => {
    await ClientServices.deleteClient(clientStore.client!.client_id);
    clientStore.deleteClient();
    notificationsStore?.setIsDeleteClient(true);
  }


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
        </Col>
        <Col
          className="client_find_result"
          span={6}
          style={{ paddingLeft: "20px" }}
        >
          {clientStore.client &&
            <CardPAClient title="Клиент" client={clientStore.client}>
              {props.isUpdateClient &&
                <Button
                  block
                  onClick={handlerUpdateClient}
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