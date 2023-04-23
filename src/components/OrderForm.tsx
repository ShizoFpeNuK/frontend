import { useForm } from "antd/es/form/Form";
import { Button, Col, Form, Input } from "antd";


export const OrderForm = () => {
  const [form] = useForm();


  return (
    <Col className="enroll_order_form" span={24}>
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
        <Form.Item>
          <Button type="primary"> Submit </Button>
        </Form.Item>
      </Form>
    </Col>
  )
}