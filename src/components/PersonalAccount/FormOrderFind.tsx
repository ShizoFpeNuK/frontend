import '../../style/css/forms/formFindOrder.css';
import { ICheck } from "../../options/model/check.model";
import { useForm } from "antd/es/form/Form";
import { CardForm } from "../../style/typescript/cardForm";
import { IClient, IClientBase } from "../../options/model/client.model";
import { Button, Card, DatePicker, DatePickerProps, Form, Input, Space } from "antd";
import ButtonStep from "../Buttons/ButtonStep";
import CheckServices from "../../services/check.service";
import notificationsStore from "../../store/NotificationsStoreClass";
import checkStore from "../../store/CheckStoreClass";
import clientStore from '../../store/ClientStoreClass';

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


interface FormFindOrderProps {
  client: IClientBase | IClient,
  notifications: boolean,
  getChecks: (checks: ICheck[]) => void,
  deleteClient: () => void,
}


const FormOrderFind = (props: FormFindOrderProps) => {
  const [form] = useForm();
  const dateFormat = "DD.MM.YYYY";

  
  const clearNotifications = () => {
    notificationsStore.deleteNotificationsChecks();
  }

  const cancelClient = async () => {
    // clientStore.deleteClient();
    // checkStore.deleteChecks();
    props.getChecks([]);
    props.deleteClient()
    notificationsStore.deleteNotificationsChecks();
  }

  const onClickDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(dateString);
  };


  const onFinish = async () => {
    // checkStore.deleteChecks();
    props.getChecks([]);
    if (props.notifications) {
      clearNotifications();
    }
    await CheckServices.getChecks(props.client.client_id)
      .then((checks: ICheck[]) => {
        if (checks.length) {
          props.getChecks(checks);
          // checkStore.setChecks(checks);
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
      <Form layout="vertical" form={form}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="client_info" style={{ textAlign: "left" }}>
          <div className="client_info_inner">
            <h3 className="client_info_inner_title"> ФИО </h3>
            <p className="client_info_inner_fullname"> {props.client.full_name} </p>
          </div>
          <div className="client_info_inner">
            <h3 className="client_info_inner_title"> Номер телефона </h3>
            <p className="client_info_inner_telephone"> {props.client.telephone} </p>
          </div>
        </div>
        <Form.Item
          label="Номер чека"
          name="check_id"
          rules={[
            {
              pattern: new RegExp(/^\d+$/),
              message: "Номер чека содержит только цифры"
            },
          ]}
        >
          <Input placeholder="Введите номер чека" />
        </Form.Item>
        <Form.Item
          label="Введите дату"
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