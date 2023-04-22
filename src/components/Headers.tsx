import { Link } from "react-router-dom";
import { Anchor, Col, Row, Image, MenuProps, Menu } from "antd";
import { FormOutlined, HomeOutlined, LoginOutlined } from "@ant-design/icons";


const items: MenuProps['items'] = [
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
  {
    label: <Link to="/auth"> Авторизоваться </Link>,
    key: "auth",
    icon: <LoginOutlined />,
  },
];


export const Header = () => {
  return (
    <Row className="header_row">
      <Col span={10} className="navigation">
        <Anchor direction="horizontal" className="navigation_left"
          items={[
            {
              key: "services-and-price",
              href: "/#services-and-price",
              title: "Услуги и цены",
            },
            {
              key: "about-us",
              href: "/#about-us",
              title: "О нас",
            },
            {
              key: "contacts",
              href: "/#contacts",
              title: "Контакты",
            }
          ]} />
      </Col>
      <Col span={4}>
        <Image src={require('../image/logo/logo1.png')} width="200px" preview={false} />
      </Col>
      <Col span={10} className="navigation">
        <Menu mode="horizontal" items={items} />
      </Col>
    </Row>
  );
};