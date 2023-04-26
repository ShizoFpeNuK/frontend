import './style/css/App.css';
import './style/css/header.css';
import './style/css/footer.css';
import './style/css/general.css';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { Enroll } from './pages/Enroll';
import { Header } from './components/Headers';
import { observer } from 'mobx-react';
import { Route, Routes } from "react-router-dom";
import { Col, Row, Image } from "antd";
import axios from "axios";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";


const App = observer(() => {
  // useEffect(() => {
  //   login.login();
  // }, [])

  return (
    <div className="App">
      <header className="header">
        <Header />
      </header>
      <main className="main">
        <div className="main_wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <Row className="footer_row">
          <Col className="footer_logo">
            <Image src={require("./options/logo/logo1.png")} width="150px" preview={false} />
          </Col>
          <Col className="footer_address">
            <span> Адрес головного заведения </span>
          </Col>
        </Row>
      </footer>
    </div>
  )
});


export default App;