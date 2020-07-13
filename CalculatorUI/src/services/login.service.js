import http from "../http-common";

class LoginDataService {
  get(id) {
    return http.get(`/user_info/${id}`);
  }

  // update(id, data) {
  //   return http.put(`/user_info/${id}`, data);
  // }
}

export default new LoginDataService();
