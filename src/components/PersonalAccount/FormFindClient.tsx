import { useForm } from "antd/es/form/Form";
import { CardForm } from "../../style/typescript/cardForm";
import { IClient, IClientBase } from "../../options/model/client.model";
import { Button, Card, Form, Input } from "antd";
import clientStore from "../../store/ClientStoreClass";
import ClientServices from "../../services/client.service";
import orderDetailsStore from "../../store/OrderDetailsStoreClass";


interface FindClientForm {
  notifications: boolean,
  isOrder: boolean,
}


const FormFindClient = ({ isOrder, notifications }: FindClientForm) => {
  const [form] = useForm();


  const clearNotifications = () => {
    clientStore.deleteIsNotFindClient();
    clientStore.deleteIsDeleteClient();
  }


  const onFinish = async (client: IClientBase) => {
    clientStore.deleteClient();
    if (notifications) {
      clearNotifications();
    }
    await ClientServices.getClient(client)
      .then((client: IClient) => {
        if (isOrder) {
          orderDetailsStore.setOrderDetailsClient(client);
        } else {
          clientStore.setClient(client);
        }
        form.resetFields();
      })
      .catch(() => {
        if (notifications) {
          if (!isOrder) {
            clientStore.setIsNotFindClient(true);
          }
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    clientStore.deleteClient();
    if (notifications) {
      clearNotifications();
    }
    console.log("Failed:", errorInfo);
  }


  return (
    <Card title="Найти клиента" style={CardForm}>
      <Form layout="vertical" form={form}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="ФИО клиента"
          name="full_name"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
          ]}
        >
          <Input defaultValue="Дьякова Ольга Александровна" placeholder="Введите имя клиента" />
        </Form.Item>
        <Form.Item
          label="Номер телефона"
          name="telephone"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
            {
              pattern: new RegExp(/^\+7\s[\(]9\d{2}[\)]\s\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/),
              message: "Пример ввода: +7 (916) 419-52-28"
            }
          ]}
        >
          <Input defaultValue="+7 (916) 419-52-28" placeholder="Введите номер телефона клиента" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" onClick={form.submit}> Найти </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}


export default FormFindClient;