import http from "../http-common";

class SaveRoomDataService {
  create(data) {
    return http.post("/savedroom", data);
  }

  get(id) {
    return http.get(`/savedroom/${id}`);
  }
}

export default new SaveRoomDataService();
