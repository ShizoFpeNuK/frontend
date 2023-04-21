import './style/App.css';
import { Header } from './components/Headers';
import { Row, Col, Card } from 'antd';
import { CardBody, CardTitle } from './style/card';


function App() {
  return (
    <div className="App">
      <header className='header'>
        <div className="container">
          <Header />
        </div>
      </header>
      <main className="main">
        <div className="container">
          
          <div className="services_and_price" id="services-and-price">
            <h1 className="services_and_price_header"> Услуги и цены </h1>
            <Row className="services_and_price_row">
              <Col span={4} className="services_and_price_card">
                <Card title="Услуга №1" headStyle={CardTitle} bodyStyle={CardBody}>
                  <p> Описание </p>
                  <p> Время выполнения </p>
                  <p> Цена </p>
                </Card>
              </Col>
            </Row>
          </div>

          <div className="about_us" id="about-us">
            <h1 className="about_us_header"> О нас </h1>
            
          </div>

        </div>
      </main>
      <footer></footer>
    </div>
  );
}


export default App;