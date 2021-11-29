import http from "../http-common.js";

class RestaurantDataService {
    getAll() {
        return http.get(``);
    }

    find(location, numberRestaurants) {
        return http.get(`location/?coord=${location}&limit=${20}`);
    }
}

export default new RestaurantDataService();