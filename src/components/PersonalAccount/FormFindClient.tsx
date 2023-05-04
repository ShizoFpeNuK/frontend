import { useForm } from "antd/es/form/Form";
import { IClient, IClientBase } from "../../options/model/client.model";
import { CardBodyForm, CardForm } from "../../style/typescript/cardForm";
import { Button, Card, Form, Input } from "antd";
import clientStore from "../../store/ClientStoreClass";
import ClientServices from "../../services/client.service";
import orderDetailsStore from "../../store/OrderDetailsStoreClass";


interface FindClientForm {
  isOrder: boolean,
}


const FormFindClient = ({isOrder}: FindClientForm) => {
  const [form] = useForm();


  const onFinish = async (client: IClientBase) => {
    await ClientServices.getClient(client)  
      .then((client: IClient) => {
        if (isOrder) {
          orderDetailsStore.setOrderDetailsClient(client);
        } else {
          clientStore.setClient(client);
        }
        form.resetFields();
      })
      .catch((err) => console.log(err))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }


  return (
    <Card
      title="Найти клиента"
      style={CardForm}
      bodyStyle={CardBodyForm}>
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
          ]}
        >
          <Input defaultValue="+7 (916) 419-52-28" placeholder="Введите номер телефона клиента" />
        </Form.Item>

        <Form.Item style={{ marginBottom: "15px" }}>
          <Button type="primary" onClick={form.submit}> Найти </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}


export default FormFindClient;