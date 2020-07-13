import http from "../http-common";

class AddSPDDataService {
  create(data) {
    return http.post("/spddata", data);
  }
}

export default new AddSPDDataService();
