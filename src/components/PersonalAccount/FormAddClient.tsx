import { useForm } from "antd/es/form/Form";
import { CardForm } from "../../style/typescript/cardForm";
import { AxiosError } from "axios";
import { IClientAdd } from "../../options/model/client.model";
import { Button, Card, Form, Input } from "antd";
import clientStore from "../../store/ClientStoreClass";
import ClientServices from "../../services/client.service";


interface FormAddClientProps {
  notifications: boolean,
}


const FormAddClient = ({ notifications }: FormAddClientProps) => {
  const [form] = useForm();


  const clearNotifications = () => {
    clientStore.deleteIsCreateClient();
    clientStore.deleteIsConflictClient();
  }


  const onFinish = async (client: IClientAdd) => {
    if (notifications) {
      clearNotifications();
    }
    await ClientServices.postClient(client)
      .then(() => {
        if (notifications) {
          clientStore.setIsCreateClient(true);
        }
        form.resetFields();
      })
      .catch((err: AxiosError) => {
        if (notifications) {
          if (err.response!.status === 409) {
            clientStore.setIsConflictClient(true);
          }
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    if (notifications) {
      clearNotifications();
    }
    console.log("Failed:", errorInfo);
  }


  return (
    <Card title="Добавить нового клиента" style={CardForm}>
      <Form layout="vertical" form={form}
        initialValues={{ remember: true }}
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
          <Input placeholder="Введите имя клиента" />
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
          <Input placeholder="Введите номер телефона клиента" />
        </Form.Item>
        <Form.Item
          label="Электронная почта"
          name="email"
        >
          <Input placeholder="Введите элеткронную почту клиента" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" onClick={form.submit}> Добавить </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}


export default FormAddClient;