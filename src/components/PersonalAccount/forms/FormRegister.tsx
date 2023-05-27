import { CardForm } from "../../../style/typescript/cardForm";
import { ReactNode } from "react";
import { FormBaseProps } from "../../../options/model/props/formBaseProps.model";
import { Button, Card, Form, Input, Space } from "antd";


interface FormRegisterProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormRegister = (props: FormRegisterProps) => {
  return (
    <Card style={CardForm}>
      <Form layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          label="Введите пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
            {
              pattern: new RegExp(/^[a-zA-Z\d\_\@\#\=\+\-\>\<\\\/\|]+$/),
              message: "Только английские буквы, цифры и некоторые спец.символы"
            }
          ]}
        >
          <Input.Password placeholder="Введите пароль" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Button
              block
              type="primary"
              onClick={props.form.submit}
            >
              Выдать
            </Button>
            <Button
              block
              danger
              onClick={() => props.form.resetFields()}
            >
              Очистить
            </Button>
            {props.buttons}
          </Space>
        </Form.Item>

      </Form >
    </Card >
  )
}


export default FormRegister;