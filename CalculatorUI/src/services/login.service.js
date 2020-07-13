import http from "../http-common";

class LoginDataService {
  get(id) {
    return http.get(`/user_info/${id}`);
  }
}

export default new LoginDataService();
