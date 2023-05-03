import { useForm } from "antd/es/form/Form";
import { ILogin, IUser } from "../options/model/user.model";
import { useNavigate } from "react-router-dom";
import { CardBodyForm, CardForm } from "../style/typescript/cardForm";
import { Button, Card, Checkbox, Form, Input } from "antd";
import loginStore from "../store/LoginStoreClass";
import LoginServices from "../services/login.service";


export const AuthForm = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  
  const onFinish = async (values: ILogin) => {
    await LoginServices.login(values.username, values.password)
      .then((user: IUser) => {
        loginStore.setIsLogin(true);
        loginStore.setUser(user);
        navigate("/personal_account");
        form.resetFields();
      })
      .catch(() => console.log("Не залогинились"));
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
          <Button type="primary" onClick={form.submit}> Войти </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}