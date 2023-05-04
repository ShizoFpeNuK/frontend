import '../style/css/auth/auth.css';
import { AuthForm } from "../components/AuthForm";


const Auth = () => {
  return (
    <div className="auth_page">
      <h1 className="auth_header title--border"> Авторизация </h1>
      <div className="auth_form">
        <AuthForm />
      </div>
    </div>
  )
};


export default Auth;