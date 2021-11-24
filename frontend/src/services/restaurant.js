import http from "../http-common.js";

class RestaurantDataService {
    getAll(page = 0) {
        return http.get(``);
    }

    get(id) {
        return http.get(`/restaurant?id=${id}`);
    }

    find(query, by = "name", page = 0) {
        return http.get(`restaurants?${by}=${query}&page=${page}`);
    }

    getCuisines(id) {
        return http.get(`/cuisines`);
    }

}

export default new RestaurantDataService();