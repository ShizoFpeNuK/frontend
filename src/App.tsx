import './style/css/App.css';
import { Auth } from './pages/Auth';
import { Home } from './pages/Main';
import { Enroll } from './pages/Enroll';
import { Header } from './components/Headers';
import { Route, Routes } from 'react-router-dom';


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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}


export default App;