namespace Api.User {
  interface Login {
    username: string;
    password: string;
  }

  interface LoginData {
    token: string;
  }

  interface GetUserInfoData {
    name: string;
  }
}
