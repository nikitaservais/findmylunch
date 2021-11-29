import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next) {
        const {restaurantsList, totalNumRestaurants} = await RestaurantsDAO.getRestaurants()
        let response = {
            restaurants: restaurantsList,
            total_results: totalNumRestaurants,
        }
        res.json(response)
    }

    static async apiGetRestaurantsByLocation(req, res, next) {
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 20
        let location = {}
        if (req.query.coord) {
            location.latitude = parseFloat(req.query.coord.split(',')[0])
            location.longitude = parseFloat(req.query.coord.split(',')[1])
        }

        const restaurantsList = await RestaurantsDAO.getRestaurantByLocation({
            limit,
            location
        })

        let response = {
            restaurants: restaurantsList,
            location: location
        }
        res.json(response)
    }
}