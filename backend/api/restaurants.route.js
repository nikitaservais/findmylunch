import express from "express";
import RestaurantsController from "./restaurantsController.js";

const router = express.Router()

router.route("/").get(RestaurantsController.apiGetRestaurants)
router.route("/location/").get(RestaurantsController.apiGetRestaurantsByLocation)

export default router