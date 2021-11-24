import express from "express"
import cors from "cors"
import restaurantsRoutes from "./restaurants.route.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/restaurants", restaurantsRoutes)
app.use("*", (req, res)=> res.status(404).json({error:"not found"}))

export default app