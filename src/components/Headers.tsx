import { Anchor, Col, Row, Image } from "antd";

export const Header = () => {
  return (
    <Row className="header_row">
      <Col span={10} className="navigation">
        <Anchor direction="horizontal" className="navigation_left"
          items={[
            {
              key: "services-and-price",
              href: "#services-and-price",
              title: "Услуги и цены",
            },
            {
              key: "about-us",
              href: "#about-us",
              title: "О нас",
            }
          ]} />
      </Col>
      <Col span={4}>
        <Image src={require('../image/logo/logo1.png')} width="200px" preview={false} />
      </Col>
      <Col span={10} className="navigation">
        <Anchor direction="horizontal" className="navigation_right"
          items={[
            {
              key: "contacts",
              href: "#contacts",
              title: "Контакты",
              children: []
            },
            {
              key: "record",
              href: "#record",
              title: "Записаться",
            }
          ]} />
      </Col>
    </Row>
  );
};