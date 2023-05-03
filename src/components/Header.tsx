import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { Col, Row, Image, MenuProps, Menu } from "antd";
import { FormOutlined, HomeOutlined, LoginOutlined } from "@ant-design/icons";
import loginStore from "../store/LoginStoreClass";


const itemsBase: MenuProps['items'] = [
  {
    label: <Link to="/"> Главная </Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/enroll"> Записаться </Link>,
    key: "enroll",
    icon: <FormOutlined />,
  },
]

const itemsBaseWithAuth: MenuProps['items'] = [
  ...itemsBase,
  {
    label: <Link to="/auth"> Авторизоваться </Link>,
    key: "auth",
    icon: <LoginOutlined />,
  },
];

const itemsBaseWithPersAccount: MenuProps['items'] = [
  ...itemsBase,
  {
    label: <Link to="/personal_account"> Личный кабинет </Link>,
    key: "personal_account",
    icon: <LoginOutlined />,
  },
];


export const Header = observer(() => {
  return (
    <Row className="header_row">
      <Col span={4}>
        <Image src={require('../options/logo/logo1.png')} width="200px" preview={false} />
      </Col>
      <Col span={6} className="navigation">
        {loginStore.isLogin
          ? <Menu mode="horizontal" items={itemsBaseWithPersAccount} />
          : <Menu mode="horizontal" items={itemsBaseWithAuth} />
        }
      </Col>
    </Row>
  );
});