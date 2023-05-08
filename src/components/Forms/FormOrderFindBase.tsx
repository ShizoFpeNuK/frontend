import { CardForm } from "../../style/typescript/cardForm";
import { ReactNode } from "react";
import { FormBaseProps } from "../../options/model/components/formBase.model";
import { Button, Card, DatePicker, DatePickerProps, Form, Space } from "antd";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";

interface FormOrderFindBaseProps extends FormBaseProps {
  buttons?: ReactNode,
  onChangeFormatDate?: DatePickerProps['onChange'],
}


const FormOrderFindBase = (props: FormOrderFindBaseProps) => {
  return (
    <Card className="client_form" title="Найти заказ" style={CardForm}>
      {props.children}

      <Form layout="vertical" form={props.form}
        initialValues={{ remember: false }}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      >
        <Form.Item
          label="Выберите дату"
          name="date"
        >
          <DatePicker
            onChange={props.onChangeFormatDate}
            format={dateFormat}
            style={{ width: "100%" }}
            placeholder="Выберите дату"
            locale={locale}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Space style={{ width: "100%", justifyContent: "center" }}>
            {props.buttons}
            <Button type="primary" onClick={props.form.submit}> Найти </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
};


export default FormOrderFindBase;