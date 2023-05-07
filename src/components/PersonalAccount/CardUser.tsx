import { Button } from "antd";
import CardBase from "./CardBase";
import loginStore from "../../store/LoginStoreClass";


const CardUser = () => {

  const onClickButtonLogout = () => {
    loginStore.setIsLogin(false);
  }


  return (
    <CardBase title="Ваши сведения" info={loginStore.user!}>
      <Button
        className="personal_account_info_inner_button"
        block
        onClick={onClickButtonLogout}
      >
        Выйти
      </Button>
    </CardBase>
  )
};


export default CardUser;