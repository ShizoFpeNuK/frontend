import './style/css/App.css';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { Enroll } from './pages/Enroll';
import { Header } from './components/Headers';
import { Route, Routes } from 'react-router-dom';
import { Col, Row, Image } from 'antd';


function App() {
  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
      <footer className="footer">
        <Row className="footer_row">
          <Col className="footer_logo" span={4}>
            <Image src={require('./image/logo/logo1.png')} width="150px" preview={false} />
          </Col>
          <Col className="footer_address" span={8}>
            Адрес головного заведения
          </Col>
        </Row>
      </footer>
    </div>
  );
}


export default App;