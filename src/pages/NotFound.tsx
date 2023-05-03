import '../style/css/main.css';
import { Link } from "react-router-dom";


export const NotFound = () => {
  return (
    <div className="notfound_page">
      <h1 className="title--border"> Такой страницы не существует! </h1>
      <Link to="/"> Главная </Link>
    </div>
  )
};