import React, {useEffect, useState} from "react";
import RestaurantDataService from "../services/restaurantDataService";
import {getDistance} from "geolib"


const RestaurantsView = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [location, setLocation] = useState("");

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position)
                setLocation([position.coords.latitude, position.coords.longitude])
            });
        }
        retrieveRestaurants();
    }, []);

    const onChangeLocation = e => {
        const value = e.target.value;
        const temp = value.split(',').map(Number);
        if (temp.length === 2 && typeof temp[0] == "number" && typeof temp[1]) {
            setLocation(temp);
        }else{
            setLocation("wrong input")
        }
    };

    const retrieveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findNearLocation = () => {
        console.log(location)
        RestaurantDataService.find(location, 20)
            .then(response => {
                console.log(response.data);
                setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            <div className="row">
                <h2>Lists the different restaurants that are available around you for your today's lunch</h2>
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Latitude"
                        value={location}
                        onChange={onChangeLocation}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Longitude"
                        value={location}
                        onChange={onChangeLocation}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findNearLocation}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {restaurants.map((restaurant) => {

                    const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
                    const distance = getDistance(location, restaurant.address.coord, 10);
                    return (
                        <div className="col-lg-4 pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                                        <strong>Address: </strong>{address}<br/>
                                        <strong>Distance: </strong>{distance + " m"}
                                    </p>
                                    <div className="row">
                                        <a target="_blank" href={"https://www.google.com/maps/place/" + address}
                                           className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}


            </div>
        </div>
    );
};

export default RestaurantsView;