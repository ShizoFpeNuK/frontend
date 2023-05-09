import { observer } from "mobx-react";
import EmployeePAStoreClass from "../../../store/EmployeePAStoreClass";
import NotificationsPAStoreClass from "../../../store/NotificationsPAStoreClass";


interface ClientFindProps {
  employeeStore: EmployeePAStoreClass,
  notificationsStore?: NotificationsPAStoreClass,
  isUpdateEmployee?: boolean,
}


const EmployeeFind = observer(() => {
  return (
    <div>111</div>
  )
});


export default EmployeeFind;