import { useForm } from "antd/es/form/Form";
import { IClientAdd } from "../../options/model/client.model";
import { CardBodyForm, CardForm } from "../../style/typescript/cardForm";
import { Button, Card, Form, Input } from "antd";
import ClientServices from "../../services/client.service";


const FormAddClient = () => {
  const [form] = useForm();


  const onFinish = async (client: IClientAdd) => {
    await ClientServices.postClient(client)
      .then(() => {
        form.resetFields();
      })
      .catch((err) => console.log(err))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }


  return (
    <Card
      title="Добавить нового клиента"
      style={CardForm}
      bodyStyle={CardBodyForm}>
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

        <Form.Item style={{ marginBottom: "15px" }}>
          <Button type="primary" onClick={form.submit}> Добавить </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}


export default FormAddClient;