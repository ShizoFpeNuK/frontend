import { useForm } from "antd/es/form/Form";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import { Button, Card, Form, Input } from "antd";


export const OrderForm = () => {
  const [form] = useForm();


  return (
    <Card title="Ваши данные" style={CardForm} bodyStyle={CardBodyForm}>
      <Form layout="vertical" form={form}
      >
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
          ]}
        >
          <Input placeholder="Введите ваше имя" />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="telephone"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
          ]}
        >
          <Input placeholder="Введите ваш номер телефона" />
        </Form.Item>
        <Form.Item style={{ marginBottom: "15px" }}>
          <Button type="primary"> Submit </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}