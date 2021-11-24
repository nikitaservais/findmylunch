import RestaurantsDAO from "./restaurantsDAO.js";

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next) {
        const {restaurantsList, totalNumRestaurants} = await RestaurantsDAO.getRestaurants()
        let response = {
            restaurants: restaurantsList,
            total_results: totalNumRestaurants,
        }
        res.json(response)
    }
}