import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { IEmployee, IEmployeeBase } from "../../../options/model/employee.model";
import EmployeeServices from "../../../services/employee.service";
import FormPeopleFindBase from "../../Forms/FormPeopleFindBase";
import EmployeePAStoreClass from "../../../store/paStore/EmployeePAStoreClass";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface FindEmployeeFormProps {
  employeeStore: EmployeePAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
}


const FormClientFind = observer(({ employeeStore, notificationsStore }: FindEmployeeFormProps) => {
  const [form] = useForm();


  const clearNotifications = () => {
    notificationsStore!.deleteNotificationsEmployee();
  }


  const onFinish = async (employee: IEmployeeBase) => {
    employeeStore.deleteEmployee();
    employeeStore.deleteEmployees();

    if (notificationsStore) {
      clearNotifications();
    }

    await EmployeeServices.getEmployeeByTelephone(employee)
      .then((employee: IEmployee) => {
        employeeStore.setEmployee(employee);
        form.resetFields();
      })
      .catch(() => {
        if (notificationsStore) {
          notificationsStore.setIsNotFindEmployee(true);
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
    <FormPeopleFindBase
      form={form}
      title="Найти сотрудника"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    />
  )
});


export default FormClientFind;