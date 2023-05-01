import { IUser } from "../options/model/user.model";
import { useForm } from "antd/es/form/Form";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import { Button, Card, Checkbox, Form, Input } from "antd";
import LoginServices from "../services/login.service";
import loginStore from "../store/LoginStoreClass";


export const AuthForm = () => {
  const [form] = useForm();


  const onFinish = async (values: IUser) => {
    await LoginServices.login(values.username, values.password)
      .then(() => loginStore.setIsLogin(true))
      .catch(() => console.log("Не залогинились"));
    form.resetFields();
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Card style={CardForm} bodyStyle={CardBodyForm}>
      <Form layout="vertical" form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Логин"
          name="username"
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
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
          ]}
        >
          <Input.Password placeholder="Введите ваш номер телефона" />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" style={{marginBottom: "10px"}}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item style={{ marginBottom: "15px" }}>
          <Button type="primary" onClick={form.submit}> Submit </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}