import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { IClient, IClientBase } from "../../../options/model/client.model";
import ClientServices from "../../../services/client.service";
import ClientPAStoreClass from "../../../store/ClientPAStoreClass";
import FormClientFindBase from "../../Forms/FormClientFindBase";
import NotificationsPAStoreClass from "../../../store/NotificationsPAStoreClass";


interface FindClientForm {
  notificationsStore?: NotificationsPAStoreClass,
  clientStore: ClientPAStoreClass,
}


const FormClientFind = observer(({ clientStore, notificationsStore }: FindClientForm) => {
  const [form] = useForm();


  const clearNotifications = () => {
    notificationsStore!.deleteNotificationsClient();
    notificationsStore!.deleteIsSubmitOrder();
  }


  const onFinish = async (client: IClientBase) => {
    clientStore.deleteClient();

    if (notificationsStore) {
      clearNotifications();
    }

    await ClientServices.getClientByTelephone(client)
      .then((client: IClient) => {
        clientStore.setClient(client);
        form.resetFields();
      })
      .catch(() => {
        if (notificationsStore) {
          notificationsStore.setIsNotFindClient(true);
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    if (notificationsStore) {
      clearNotifications();
    }
    console.log("Failed:", errorInfo);
  }


  return (
    <FormClientFindBase
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
});


export default FormClientFind;