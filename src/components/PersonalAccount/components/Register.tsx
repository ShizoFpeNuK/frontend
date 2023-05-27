import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { IRegister } from "../../../options/model/register.model";
import { AxiosError } from "axios";
import { Button, Col, Row } from "antd";
import ButtonStep from "../../Buttons/ButtonStep";
import FormRegister from "../forms/FormRegister";
import ResultSuccess from "../../Results/ResultSuccess";
import FormEmployeeFind from "../forms/FormEmployeeFind";
import RegisterServices from "../../../services/register.service";
import ResultErrorConflict from "../../Results/ResultErrorConflict";
import EmployeePAStoreClass from "../../../store/paStore/EmployeePAStoreClass";
import NotificationsPAStoreClass from "../../../store/paStore/NotificationsPAStoreClass";
import ResultErrorNotCorrectData from "../../Results/ResultErrorNotCorrectData";


const employeeStore = new EmployeePAStoreClass();
const notificationsStore = new NotificationsPAStoreClass();

interface FormValues {
  password: string,
}


const Register = observer(() => {
  const [form] = useForm();


  const cancelChoiceEmployee = () => {
    employeeStore.deleteEmployee();
  }


  const onFinish = async (values: FormValues) => {
    notificationsStore.deleteNotificationsRegister();
    const correctValues: IRegister = {
      ...values,
      "user_id": employeeStore.employee!.employee_id,
    }

    await RegisterServices.register(correctValues)
      .then(() => {
        notificationsStore.setIsSuccessRegister(true);
        form.resetFields();
        employeeStore.deleteEmployee();
      })
      .catch((err: AxiosError) => {
        if (err.response!.status === 409) {
          notificationsStore?.setIsConflictRegister(true);
        }
      })
  }

  const onFinishFailed = () => {
    notificationsStore.deleteNotificationsRegister();
  }


  const onClickDeleteUser = async () => {
    notificationsStore.deleteNotificationsRegister();
    await RegisterServices.unregister(employeeStore.employee!.employee_id)
      .then(() => {
        notificationsStore.setIsSuccessUnregister(true);
        form.resetFields();
        employeeStore.deleteEmployee();
      })
  }


  useEffect(() => {
    return () => {
      employeeStore.deleteEmployee();
      notificationsStore.deleteIsConflictEmployee();
      notificationsStore.deleteNotificationsRegister();
    }
  }, [])


  return (
    <div className="issuance_login">
      <h2 className="issuance_login_title title--border"> Выдать пароль </h2>
      <Row
        justify={'space-between'}
        className="issuance_login_row"
      >
        <Col
          span={6}
          style={{ paddingRight: "20px" }}
        >
          {employeeStore.employee
            ? <>
              <FormRegister
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                buttons={
                  <ButtonStep
                    block
                    onClick={cancelChoiceEmployee}
                  >
                    Назад
                  </ButtonStep>
                }
              />
              {/* Кнопка активна толко для незарегистрированных */}
              <Button
                block
                onClick={onClickDeleteUser}
                style={{ marginTop: "20px" }}
              >
                Удалить пользователя
              </Button>
            </>
            : <FormEmployeeFind
              employeeStore={employeeStore}
              notificationsStore={notificationsStore}
            />
          }
        </Col>
        <Col
          span={18}
          style={{ paddingLeft: "20px" }}
        >
          {notificationsStore.isNotFindEmployee &&
            <ResultErrorNotCorrectData title="Сотрудник не был найден" />
          }
          {notificationsStore.isSuccessRegister &&
            <ResultSuccess title="Пользователь успешно зарегистрирован!" />
          }
          {notificationsStore.isConflictRegister &&
            <ResultErrorConflict title="Этому пользователю уже выданы логин и пароль!" />
          }
          {notificationsStore.isSuccessUnregister &&
            <ResultSuccess title="Пользователь успешно удалён!" />
          }
        </Col>
      </Row>
    </div>
  )
});


export default Register;