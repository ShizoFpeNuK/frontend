import { useForm } from "antd/es/form/Form";
import { AxiosError } from "axios";
import { IEmployeeCreate } from "../../../options/model/employee.model";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";
import FormEmployeeAddBase from "../../Forms/FormEmployeeAddBase";
import EmployeeServices from "../../../services/employee.service";


interface FormAddEmployeeProps {
  notificationsStore?: NotificationsPAStoreClass,
}


const FormAddEmployee = ({ notificationsStore }: FormAddEmployeeProps) => {
  const [form] = useForm();


  const onFinish = async (employee: IEmployeeCreate) => {
    notificationsStore?.deleteNotificationsEmployee();
    console.log(employee);

    await EmployeeServices.createEmployee(employee)
      .then(() => {
        notificationsStore?.setIsCreateEmployee(true);
        form.resetFields();
      })
      .catch((err: AxiosError) => {
        if (err.response!.status === 409) {
          notificationsStore?.setIsConflictEmployee(true);
        }
      })
  }

  const onFinishFailed = (errorInfo: any) => {
    notificationsStore?.deleteNotificationsClient();
    console.log("Failed:", errorInfo);
  }


  return (
    <FormEmployeeAddBase
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
}


export default FormAddEmployee;