import '../style/css/auth.css';
import '../style/css/main.css';
import { observer } from "mobx-react";
import { AuthForm } from "../components/AuthForm";


export const Auth = observer(() => {
  return (
    <div className="auth_page">
      <h1 className="auth_header title--border"> Авторизация </h1>
      <div className="auth_form" itemType="items">
        <AuthForm />
      </div>
    </div>
  )
});