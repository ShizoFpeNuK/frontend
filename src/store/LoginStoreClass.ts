import { makeAutoObservable } from "mobx";


class LoginStoreClass {
  isLogin: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setIsLogin(boolean: boolean) {
    this.isLogin = boolean;
  }
};


const loginStore = new LoginStoreClass();
export default loginStore;