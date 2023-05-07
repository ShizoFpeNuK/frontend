import '../../style/css/forms/formFindOrder.css';
import { useForm } from "antd/es/form/Form";
import { IClient } from "../../options/model/client.model";
import { useState } from "react";
import { CardForm } from "../../style/typescript/cardForm";
import { ICheck, ICheckFind } from "../../options/model/check.model";
import { Button, Card, DatePicker, DatePickerProps, Form, Space } from "antd";
import ButtonStep from "../Buttons/ButtonStep";
import CheckServices from "../../services/check.service";
import notificationsStore from "../../store/NotificationsStoreClass";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


interface FormFindOrderProps {
  client: IClient,
  notifications: boolean,
  getChecks: (checks: ICheck[]) => void,
  deleteClient: () => void,
}


const FormOrderFind = (props: FormFindOrderProps) => {
  const [form] = useForm();
  const [date, setDate] = useState<string | null>(null);
  const dateFormat = "DD.MM.YYYY";


  const clearNotifications = () => {
    notificationsStore.deleteNotificationsChecks();
  }

  const cancelClient = async () => {
    props.getChecks([]);
    props.deleteClient();
    notificationsStore.deleteNotificationsChecks();
  }

  const onClickDate: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(date?.format("YYYY-MM-DD") ?? null);
  };


  const onFinish = async (values: ICheckFind) => {
    props.getChecks([]);
    if (props.notifications) {
      clearNotifications();
    }

    if (date) {
      values.date = date;
      setDate(null);
    }

    await CheckServices.getChecks(props.client.client_id, values)
      .then((checks: ICheck[]) => {
        if (checks.length) {
          props.getChecks(checks);
        } else {
          notificationsStore.setIsEmptyChecks(true);
        }
        form.resetFields();
      })
      .catch(() => {
        notificationsStore.setIsNotFindChecks(true);
      }
      )
  }

  const onFinishFailed = (errorInfo: any) => {
    if (props.notifications) {
      clearNotifications();
    }
    console.log("Failed:", errorInfo);
  }


  return (
    <Card className="client_form" title="Найти заказ" style={CardForm}>
      <div className="client_info" style={{ textAlign: "left" }}>
        <div className="client_info_inner">
          <h3 className="client_info_inner_title"> ФИО </h3>
          <p className="client_info_inner_fullname"> {props.client.full_name} </p>
        </div>
        <div className="client_info_inner">
          <h3 className="client_info_inner_title"> Номер телефона </h3>
          <p className="client_info_inner_telephone"> {props.client.telephone} </p>
        </div>
        <div className="client_info_inner">
          <h3 className="client_info_inner_title"> Бонусы </h3>
          <p className="client_info_inner_bonus"> {props.client.bonus} </p>
        </div>
      </div>
      <Form layout="vertical" form={form}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Выберите дату"
          name="date"
        >
          <DatePicker
            onChange={onClickDate}
            format={dateFormat}
            style={{ width: "100%" }}
            placeholder="Выберите дату"
            locale={locale}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Space style={{ width: "100%", justifyContent: "center" }}>
            <ButtonStep onClick={cancelClient}> Назад </ButtonStep>
            <Button type="primary" onClick={form.submit}> Найти </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}


export default FormOrderFind;