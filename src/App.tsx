import './style/css/App.css';
import { observer } from "mobx-react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import axios from "axios";
import Enroll from "./pages/Enroll";
import Header from "./components/MainComponents/Header";
import Footer from "./components/MainComponents/Footer";
import NotFound from "./pages/NotFound";
import PersonalAccount from "./pages/PersonalAccount";


axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";


const App = observer(() => {
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
            <Route path="/personal_account" element={<PersonalAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  )
});


export default App;