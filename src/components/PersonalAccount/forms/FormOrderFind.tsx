import '../../../style/css/forms/formFindOrder.css';
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { DatePickerProps } from "antd";
import { ICheck, ICheckFind } from "../../../options/model/check.model";
import ButtonStep from "../../Buttons/ButtonStep";
import CheckServices from "../../../services/check.service";
import FormOrderFindBase from "../../Forms/FormOrderFindBase";
import CheckPAStoreClass from "../../../store/CheckPAStoreClass";
import ClientPAStoreClass from "../../../store/ClientPAStoreClass";
import NotificationsPAStoreClass from "../../../store/NotificationsPAStoreClass";


interface FormFindOrderProps {
  checkStore: CheckPAStoreClass,
  clientStore: ClientPAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}


const FormOrderFind = ({ clientStore, notificationsStore, checkStore }: FormFindOrderProps) => {
  const [date, setDate] = useState<string | null>(null);
  const [form] = useForm();


  const cancelClient = async () => {
    checkStore.deleteChecks();
    clientStore.deleteClient();
    notificationsStore?.deleteNotificationsChecks();
  }

  const onClickDate: DatePickerProps['onChange'] = (date, dateString) => {
    setDate(date?.format("YYYY-MM-DD") ?? null);
  };


  const onFinish = async (values: ICheckFind) => {
    checkStore.deleteChecks();
    notificationsStore?.deleteNotificationsChecks();

    if (date) {
      values.date = date;
      setDate(null);
    }

    await CheckServices.getChecks(clientStore.client!.client_id, values)
      .then((checks: ICheck[]) => {
        if (checks.length) {
          checkStore.setChecks(checks);
        } else {
          notificationsStore?.setIsEmptyChecks(true);
        }
        form.resetFields();
      })
      .catch(() => {
        notificationsStore?.setIsNotFindChecks(true);
      }
      )
  }

  const onFinishFailed = (errorInfo: any) => {
    notificationsStore?.deleteNotificationsChecks();
    console.log("Failed:", errorInfo);
  }


  return (
    <FormOrderFindBase
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onChangeFormatDate={onClickDate}
      buttons={<ButtonStep onClick={cancelClient}> Назад </ButtonStep>}
    >
      <div className="client_info" style={{ textAlign: "left" }}>
        <div className="client_info_inner">
          <h3 className="client_info_inner_title"> ФИО </h3>
          <p className="client_info_inner_fullname"> {clientStore.client!.full_name} </p>
        </div>
        <div className="client_info_inner">
          <h3 className="client_info_inner_title"> Номер телефона </h3>
          <p className="client_info_inner_telephone"> {clientStore.client!.telephone} </p>
        </div>
        <div className="client_info_inner">
          <h3 className="client_info_inner_title"> Бонусы </h3>
          <p className="client_info_inner_bonus"> {clientStore.client!.bonus} </p>
        </div>
      </div>
    </FormOrderFindBase>
  )
}


export default FormOrderFind;