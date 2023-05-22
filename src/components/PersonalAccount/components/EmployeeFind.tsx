import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { IEmployee, IEmployeeUpdate } from "../../../options/model/employee.model";
import { Button, Col, Row, Space } from "antd";
import ResultSuccess from "../../Results/ResultSuccess";
import CardPAEmployee from "../cards/CardPAEmployee";
import FormEmployeeFind from "../forms/FormEmployeeFind";
import EmployeeServices from "../../../services/employee.service";
import ModalUpdateEmployee from "../modals/ModalUpdateEmployee";
import EmployeePAStoreClass from "../../../store/paStore/EmployeePAStoreClass";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";


const employeeStore = new EmployeePAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();

interface ClientFindProps {
  isUpdateEmployee?: boolean,
}

const getCorrectValue = (values: IEmployeeUpdate, employeeStore: EmployeePAStoreClass) => {
  return {
    ...values,
    "full_name": values["full_name"]?.length ? values["full_name"] : employeeStore.employee!.full_name,
    "telephone": values["telephone"]?.length ? values["telephone"] : employeeStore.employee!.telephone,
    "email": values["email"]?.length ? values["email"] :
      values["email"] !== undefined ? undefined : employeeStore.employee!.email,
    "age": values["age"] > 15 ? values["age"] : employeeStore.employee!.age,
    "experience": values["experience"] ? values["experience"] : employeeStore.employee!.experience,
    "salary": values["salary"] ? values["salary"] : employeeStore.employee!.salary,
    "brief_info": values["brief_info"]?.length ? values["brief_info"] :
      values["brief_info"] !== undefined ? undefined : employeeStore.employee!.brief_info,
    "post": values["post"]?.length ? values["post"] : employeeStore.employee!.post,
    "services_id": values["services_id"]?.length ? values["services_id"] : employeeStore.employee?.services_id,
  }
}


const EmployeeFind = observer((props: ClientFindProps) => {
  const [form] = useForm();


  const handlerGetEmployees = async () => {
    notificationsStore?.deleteNotificationsEmployee();
    employeeStore.deleteEmployees();
    employeeStore.deleteEmployee();
    const employees: IEmployee[] = await EmployeeServices.getAll();
    employeeStore.setEmployees(employees);
  }


  const onFinishEmployee = async (values: IEmployeeUpdate) => {
    const correctValue: IEmployeeUpdate = getCorrectValue(values, employeeStore);

    await EmployeeServices.updateEmployee(employeeStore.employee!.employee_id, correctValue)
      .then(async () => {
        const employee = await EmployeeServices.getEmployee(employeeStore.employee!.employee_id);
        employeeStore.deleteEmployee();
        employeeStore.setEmployee(employee);
      })
  }

  const onFinishEmployees = async (values: IEmployeeUpdate) => {
    const correctValue: IEmployeeUpdate = getCorrectValue(values, employeeStore);

    await EmployeeServices.updateEmployee(employeeStore.employee!.employee_id, correctValue)
      .then(async () => {
        const employees: IEmployee[] = await EmployeeServices.getAll();
        employeeStore.deleteEmployees();
        employeeStore.setEmployees(employees);
      })
  }

  const handlerUpdateEmployee = async (employee: IEmployee) => {
    ModalUpdateEmployee(form, employee, onFinishEmployee);
  };

  const handlerUpdateEmployees = async (employee: IEmployee) => {
    employeeStore.setEmployee(employee);
    ModalUpdateEmployee(form, employee, onFinishEmployees);
  };

  const handlerDeleteEmployee = async (employee: IEmployee) => {
    await EmployeeServices.deleteEmployee(employee.employee_id);
    employeeStore.deleteEmployee();
    notificationsStore?.setIsDeleteEmployee(true);
  }

  const handlerDeleteEmployees = async (employee: IEmployee) => {
    await EmployeeServices.deleteEmployee(employee.employee_id)
      .then(async () => {
        const employees: IEmployee[] = await EmployeeServices.getAll();
        employeeStore.setEmployees(employees);
      })
  }

  
  useEffect(() => {
    return () => {
      employeeStore.deleteEmployee();
      employeeStore.deleteEmployees();
      notificationsStore.deleteNotificationsEmployee();
    }
  }, [])


  return (
    <div className="employee_find">
      <h2 className="employee_find_title title--border"> Найти сотрудника Якимова Варвара Григорьевна +7 (956) 254-33-29 </h2>
      <Row
        justify={'space-between'}
        className="employee_find_row"
      >
        <Col
          className="employee_find_form"
          span={6}
          style={{ paddingRight: "20px" }}
        >
          <FormEmployeeFind
            employeeStore={employeeStore}
            notificationsStore={notificationsStore}
          />
          <Button
            block
            style={{ marginTop: "10px" }}
            onClick={handlerGetEmployees}
          >
            Найти всех
          </Button>
        </Col>
        <Col
          className="employee_find_result"
          span={18}
          style={{ paddingLeft: "20px" }}
        >
          {employeeStore.employee && employeeStore.employees.length === 0 &&
            <CardPAEmployee
              title="Сотрудник"
              employee={employeeStore.employee}
            >
              {props.isUpdateEmployee &&
                <Button
                  block
                  onClick={() => handlerUpdateEmployee(employeeStore.employee!)}
                  style={{ marginBottom: "10px" }}
                >
                  Изменить
                </Button>
              }
              <Button
                block
                onClick={() => handlerDeleteEmployee(employeeStore.employee!)}
              >
                Удалить
              </Button>
            </CardPAEmployee>
          }
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%" }}
          >
            {employeeStore.employees.map((employee: IEmployee) =>
              <CardPAEmployee
                title="Сотрудник"
                employee={employee}
                key={employee.employee_id}
              >
                {props.isUpdateEmployee &&
                  <Button
                    block
                    onClick={() => handlerUpdateEmployees(employee)}
                    style={{ marginBottom: "10px" }}
                  >
                    Изменить
                  </Button>
                }
                <Button
                  block
                  onClick={() => handlerDeleteEmployees(employee)}
                >
                  Удалить
                </Button>
              </CardPAEmployee>
            )}
          </Space>

          {notificationsStore?.isNotFindEmployee &&
            <ResultErrorNotCorrectData title="Сотрудник не был найден" />
          }
          {notificationsStore?.isDeleteEmployee &&
            <ResultSuccess title="Сотрудник был успешно удалён" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default EmployeeFind;