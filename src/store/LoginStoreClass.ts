import axios from "axios";
import { makeAutoObservable } from "mobx";


class LoginStoreClass {
  isLogin: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  async login() {
    await axios.post("/login",
      {
        username: "vas",
        password: "123"
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    );

    this.setIsLogin();
  }


  setIsLogin() {
    this.isLogin = true;
  }
};


const login = new LoginStoreClass();
export default login;