import { observer } from "mobx-react";
import { Navigate } from "react-router-dom";
import PAWorker from "./personalAccounts/PAWorker";
import PAManager from "./personalAccounts/PAManager";
import loginStore from "../store/LoginStoreClass";
import PAControl from "./personalAccounts/PAControl";


const PersonalAccount = observer(() => {

  if (!loginStore.isLogin) {
    return <Navigate to="/auth" />
  }


  return (
    <div className="personal_account_page">
      {/* <PAManager /> */}
      {/* <PAWorker workerId={loginStore.user!.user_id} /> */}
      <PAControl />
    </div>
  )
});


export default PersonalAccount;