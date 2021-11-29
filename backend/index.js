import mongodb from "mongodb"
import app from "./server.js"
import RestaurantsDAO from "./dao/restaurantsDAO.js";

const MongoClient = mongodb.MongoClient

const port = 5000

MongoClient.connect("mongodb+srv://nikita:nikita@cluster0.pldnh.mongodb.net/sample_restaurants?retryWrites=true&w=majority", {
}).catch(error => {
    console.error(error.stack)
    process.exit()
}).then(async client => {
    await RestaurantsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening`)
    })
})

