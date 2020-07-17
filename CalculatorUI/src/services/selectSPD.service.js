import http from "../http-common";

class SelectSPDService {
  get(id) {
    return http.get(`/spddata/${id}`);
  }
}

export default new SelectSPDService();
