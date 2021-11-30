import http from "../http-common.js";

class RestaurantDataService {
    getAll() {
        return http.get(``);
    }

    find(latitude, longitude, numberRestaurants) {
        return http.get(`location/?latitude=${latitude}&longitude=${longitude}&limit=${20}`);
    }
}

export default new RestaurantDataService();