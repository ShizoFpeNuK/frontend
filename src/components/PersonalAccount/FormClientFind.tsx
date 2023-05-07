import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { CardForm } from "../../style/typescript/cardForm";
import { IClient, IClientBase } from "../../options/model/client.model";
import { Button, Card, Form, Input } from "antd";
import ClientServices from "../../services/client.service";
import notificationsStore from "../../store/NotificationsStoreClass";


interface FindClientForm {
  notifications: boolean,
  isOrder: boolean,
  getClient: (client: IClient) => void,
  deleteClient: () => void,
}


const FormClientFind = observer((props: FindClientForm) => {
  const [form] = useForm();


  const clearNotifications = () => {
    notificationsStore.deleteNotificationsClient();
    notificationsStore.deleteIsSubmitOrder();
  }


  const onFinish = async (client: IClientBase) => {
    props.deleteClient();

    if (props.notifications) {
      clearNotifications();
    }

    await ClientServices.getClient(client)
      .then((client: IClient) => {
        if (props.isOrder) {
          props.getClient(client);
        } else {
          props.getClient(client);
        }
        form.resetFields();
      })
      .catch(() => {
        if (props.notifications) {
          notificationsStore.setIsNotFindClient(true);
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    if (props.notifications) {
      clearNotifications();
    }
    console.log("Failed:", errorInfo);
  }


  return (
    <Card title="Найти клиента" style={CardForm}>
      <Form
        layout="vertical"
        form={form}
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
            {
              pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
              message: "Только русские буквы, пробелы и дефисы"
            }
          ]}
        >
          <Input defaultValue="Дьякова Ольга Александровна" placeholder="Например, Иванов Иван Иваныч" />
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
          <Input defaultValue="+7 (916) 419-52-28" placeholder="Например, +7 (999) 999-99-99" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" onClick={form.submit}> Найти </Button>
        </Form.Item>
      </Form>
    </Card>
  )
});


export default FormClientFind;