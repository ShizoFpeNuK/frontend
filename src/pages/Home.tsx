import '../style/css/main.css';
import { Col, Row } from "antd";
import { CardServices } from "../components/CardServices";


export const Home = () => {
  return (
    <div className="home_page">
      <div className="services_and_price" id="services-and-price">
        <h1 className="services_and_price_header"> Услуги и цены </h1>
        <Row className="services_and_price_row">
          <Col span={4} className="services_and_price_card">
            <CardServices />
          </Col>
        </Row>
      </div>

      <div className="about_us" id="about-us">
        <h1 className="about_us_header"> О нас </h1>
        <h3 className="about_us_subtitle"> BarberShop В МОСКВЕ - ЭТО МОЙ БАРБЕРШОП! </h3>
        <p className="about_us_text">
          Твой имидж - инструмент успеха? Ты сам решаешь, как тебе выглядеть? BarberShop - это место где мужчина, знающий,
          чего хочет от жизни, формирует свой стиль. Мы - мужская парикмахерская, собравшая лучших профессионалов Москвы,
          которые воплотят в реальность твое желание выглядеть стильно.
        </p>
      </div>

      <div className="contacts" id="contacts">
        <h1 className="contacts_header"> Контакты </h1>
        <div className="contacts_info">
          <div className="contacts_info_address">
            МОСКВА,
            <br /> НОВОДАНИЛОВСКАЯ НАБЕРЕЖНАЯ,
            <br /> Д. 4, СТР. 3
            <br /> М. «ТУЛЬСКАЯ»
          </div>
          <a className="contacts_info_telephone" href="tel:+74951897453"> 8 (495) 189-74-53</a>
          <p className="contacts_info_text">
            Без выходных: 10:00-21:00
            <br /> Бесплатная парковка для гостей
          </p>
        </div>
      </div>
    </div >
  )
};