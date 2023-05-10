import { Form, Input } from "antd";
import { IEmployeeUpdate } from "../../options/model/employee.model"
import { FormBaseProps } from "../../options/model/props/formBaseProps.model"
import FormPeopleUpdateBase from "./FormPeopleUpdateBase"


interface FormEmployeeUpdateBaseProps extends FormBaseProps {
  employee: IEmployeeUpdate
}


const FormEmployeeUpdateBase = (props: FormEmployeeUpdateBaseProps) => {
  return (
    <FormPeopleUpdateBase
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      defaultPeopleInfo={props.employee}
    >
      <Form.Item
        label="Возраст"
        name="age"
        rules={[
          {
            pattern: new RegExp(/^[1-9]\d{1,2}$/),
            message: "Введите адекватный возраст!"
          }
        ]}
      >
        <Input
          defaultValue={props.employee.age}
        />
      </Form.Item>
      <Form.Item
        label="Опыт работы (мес)"
        name="experience"
        rules={[
          {
            pattern: new RegExp(/^\d{1,4}$/),
            message: "Введите адекватный опыт работы в месяцах!"
          }
        ]}
      >
        <Input
          defaultValue={props.employee.experience}
        />
      </Form.Item>
      <Form.Item
        label="Зарплата"
        name="salary"
        rules={[
          {
            pattern: new RegExp(/^[1-9]\d{1,5}$/),
            message: "Введите зарплату выше МРОТ по Москве!"
          }
        ]}
      >
        <Input
          defaultValue={props.employee.salary}
        />
      </Form.Item>
      <Form.Item
        label="Краткая информация"
        name="brief_info"
        rules={[
          {
            pattern: new RegExp(/^[а-яА-Яa-zA-Z0-9\s-]+$/),
            message: "Только буквы русского и английского алфавитов, пробелы, цифры и дефис!"
          }
        ]}
      >
        <Input.TextArea
          allowClear
          defaultValue={props.employee.brief_info}
          style={{resize: "none", height: "150px"}}
        />
      </Form.Item>
      <Form.Item
        label="Позиция"
        name="post"
      >
        <Input
          defaultValue={props.employee.post}
        />
      </Form.Item>
    </FormPeopleUpdateBase>
  )
};


export default FormEmployeeUpdateBase;