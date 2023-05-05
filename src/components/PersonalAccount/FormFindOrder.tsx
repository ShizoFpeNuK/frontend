import '../../style/css/forms/formFindOrder.css';
import { ICheck } from "../../options/model/check.model";
import { useForm } from "antd/es/form/Form";
import { CardForm } from "../../style/typescript/cardForm";
import { IClientBase } from "../../options/model/client.model";
import { Button, Card, Form, Input } from "antd";
import checkStore from "../../store/CheckStoreClass";
import CheckServices from "../../services/check.service";


interface FormFindOrderProps {
  info: IClientBase,
}


const FormFindOrder = ({ info }: FormFindOrderProps) => {
  const [form] = useForm();


  const onFinish = async () => {
    checkStore.deleteChecks();
    checkStore.deleteIsEmptyChecks();
    checkStore.deleteIsNotFindChecks();
    await CheckServices.getChecks(info.client_id)
      .then((checks: ICheck[]) => {
        if (checks.length) {
          checkStore.setChecks(checks);
        } else {
          checkStore.setIsEmptyChecks(true);
        }
        form.resetFields();
      })
      .catch(() => {
        checkStore.setIsNotFindChecks(true);
      }
      )
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }


  return (
    <Card title="Найти заказ" style={CardForm}>
      <Form layout="vertical" form={form}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="client_info" style={{ textAlign: "left" }}>
          <div className="client_info_inner">
            <h3 className="client_info_inner_title"> ФИО </h3>
            <p className="client_info_inner_fullname"> {info.full_name} </p>
          </div>
          <div className="client_info_inner">
            <h3 className="client_info_inner_title"> Номер телефона </h3>
            <p className="client_info_inner_telephone"> {info.telephone} </p>
          </div>
        </div>
        <Form.Item
          label="Номер чека"
          name="check_id"
        >
          <Input placeholder="Введите номер чека" />
        </Form.Item>
        <Form.Item
          label="Номер заказа"
          name="order_id"
        >
          <Input placeholder="Введите номер заказа" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" onClick={form.submit}> Найти </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}


export default FormFindOrder;