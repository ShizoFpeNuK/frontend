import '../style/css/main.css';
import { observer } from "mobx-react";
import { Col, Row } from "antd";
import { IService } from "../options/model/service.model";
import { useEffect } from "react";
import { CardService } from "../components/CardService";
import servicesStore from "../store/ServicesStoreClass";


export const Home = observer(() => {
  // useEffect(() => {
  //   if (login.isLogin) {
  //     servicesStore.getServicesList();
  //   }
  // }, [login.isLogin])

  useEffect(() => {
    servicesStore.getServicesList();
  }, [])


  return (
    <div className="home_page">
      <div className="services_and_price" id="services-and-price">
        <h1 className="services_and_price_header title"> Услуги и цены </h1>
        <Row className="services_and_price_row">
          {servicesStore.ServicesList.map((service: IService) =>
            <Col className="services_and_price_card" key={service.service_id} span={4}>
              <CardService service={service} />
            </Col>
          )}
        </Row>
      </div>

      <div className="about_us" id="about-us">
        <h1 className="about_us_header title"> О нас </h1>
        <h3 className="about_us_subtitle"> BarberShop В МОСКВЕ - ЭТО МОЙ БАРБЕРШОП! </h3>
        <p className="about_us_text">
          Твой имидж - инструмент успеха? Ты сам решаешь, как тебе выглядеть? BarberShop - это место где мужчина, знающий,
          чего хочет от жизни, формирует свой стиль. Мы - мужская парикмахерская, собравшая лучших профессионалов Москвы,
          которые воплотят в реальность твое желание выглядеть стильно.
        </p>
      </div>

      <div className="contacts" id="contacts">
        <h1 className="contacts_header title"> Контакты </h1>
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
    </div>
  )
});