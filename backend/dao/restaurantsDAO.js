let restaurantsDBReference

export default class RestaurantsDAO {
    static async injectDB(connection) {
        if (restaurantsDBReference) {
            return
        }
        try {
            restaurantsDBReference = await connection.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${e}`,
            )
        }
    }

    static async getRestaurants({number = 20} = {}) {
        let query
        let cursor

        try {
            cursor = await restaurantsDBReference
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return {restaurantsList: [], totalNumRestaurants: 0}
        }

        const displayCursor = cursor.limit(number)

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = await restaurantsDBReference.countDocuments(query)
            return {restaurantsList, totalNumRestaurants}
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents, ${e}`,
            )
            return {restaurantsList: [], totalNumRestaurants: 0}
        }
    }

    static async getRestaurantByLocation({limit = 20, location = null} = {}) {
        try {
            const pipeline = [
                {
                    $geoNear: {
                        near: [-74.010049, 40.707362],
                        distanceField: "dist",
                        // maxDistance: 2,
                        // query: { category: "Parks" },
                        // includeLocs: "dist.location",
                        // spherical: true
                    }
                }
            ]
            let cursor
            try {
                cursor = await restaurantsDBReference.aggregate(pipeline)
            } catch (e) {
                console.error(`Unable to issue find command, ${e}`)
                return {restaurantsList: [], totalNumRestaurants: 0}
            }

            const displayCursor = cursor.limit(limit)

            try {
                return await displayCursor.toArray()
            } catch (e) {
                console.error(
                    `Unable to convert cursor to array or problem counting documents, ${e}`,
                )
                return []
            }

        } catch (e) {
            console.error(`Something went wrong in getRestaurantByLocation: ${e}`)
            throw e
        }
    }
}
