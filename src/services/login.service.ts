import axios from "axios";


export default class LoginServices {
  static pathDefault: string = "/login";


  static async login(username: string, password: string) {
    await axios.post(this.pathDefault,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    );
  }
}