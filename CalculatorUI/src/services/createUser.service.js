import http from "../http-common";

class CreateUserDataService {
  create(data) {
    return http.post("/user_info", data);
  }
}

export default new CreateUserDataService();
