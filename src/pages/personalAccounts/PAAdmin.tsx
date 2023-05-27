import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space } from "antd";
import Register from "../../components/PersonalAccount/components/Register";
import CardPAUser from "../../components/PersonalAccount/cards/CardPAUser";
import EmployeeFind from "../../components/PersonalAccount/components/EmployeeFind";




const PAAdmin = () => {
  const [isOpenFindEmployeeForm, setIsOpenFindEmployeeForm] = useState<boolean>(false);
  const [isOpenRegisterEmployeeForm, setIsOpenRegisterEmployeeForm] = useState<boolean>(false);


  const onClickFoundEmployeeButton = () => {
    setIsOpenRegisterEmployeeForm(false);
    setIsOpenFindEmployeeForm(!isOpenFindEmployeeForm);
  }

  const onClickRegisterEmployeeButton = () => {
    setIsOpenFindEmployeeForm(false);
    setIsOpenRegisterEmployeeForm(!isOpenRegisterEmployeeForm);
  }


  return (
    <div className="personal_account_admin_page">
      <h1 className="personal_account_admin_title title--border"> Личный кабинет </h1>
      <Row className="personal_account_admin_row">
        <Col
          className="personal_account_admin_info"
          span={4}
          style={{ paddingRight: "20px" }}
        >
          <CardPAUser />
          <Space
            className="personal_account_manager_admin_buttons"
            direction="vertical"
            style={{ width: "100%" }}>
            <Button block onClick={onClickFoundEmployeeButton}>
              <SearchOutlined /> Найти сотрудника
            </Button>
            <Button block onClick={onClickRegisterEmployeeButton}>
              <SearchOutlined /> Выдать пароль
            </Button>
          </Space>
        </Col>

        <Col
          className="personal_account_admin_forms"
          span={20}
          style={{ paddingLeft: "20px" }}
        >
          {isOpenFindEmployeeForm &&
            <EmployeeFind />
          }
          {isOpenRegisterEmployeeForm &&
            <Register />
          }
        </Col>
      </Row>
    </div>
  )
}


export default PAAdmin;