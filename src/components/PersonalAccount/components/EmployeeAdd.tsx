import { observer } from "mobx-react";
import { Col, Row } from "antd";
import ResultSuccess from "../../Results/ResultSuccess";
import FormEmployeeAdd from "../forms/FormEmployeeAdd";
import ResultErrorConflict from "../../Results/ResultErrorConflict";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";


interface EmployeeAddProps {
  notificationsStore?: NotificationsPAStoreClass,
}


const EmployeeAdd = observer(({ notificationsStore }: EmployeeAddProps) => {
  return (
    <div className="personal_account_forms_employee">
      <h2 className="personal_account_forms_employee_title title--border"> Добавить сотрудника </h2>
      <Row justify={'space-between'} className="personal_account_forms_employee_row">
        <Col className="personal_account_employee_form" span={6}>
          <FormEmployeeAdd notificationsStore={notificationsStore} />
        </Col>
        <Col className="personal_account_employee_result" span={6}>
          {notificationsStore?.isCreateEmployee &&
            <ResultSuccess title="Сотрудник успешно создан!" />
          }
          {notificationsStore?.isConflictEmployee &&
            <ResultErrorConflict title="Такой сотрудник уже создан!" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default EmployeeAdd;