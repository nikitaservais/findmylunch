import React, {useEffect, useState} from "react";
import RestaurantDataService from "../services/restaurantDataService";


const RestaurantsView = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        retrieveRestaurants();
    }, []);

    const onChangeLatitude = e => {
        const value = e.target.value;
        setLatitude(value)
    };

    const onChangeLongitude = e => {
        const value = e.target.value;
        setLongitude(value)
    };

    const retrieveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findNearLocation = () => {
        RestaurantDataService.find(latitude, longitude, 20)
            .then(response => {
                setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position)
                setLatitude([position.coords.latitude])
                setLongitude([position.coords.longitude])
            });
        }
    };

    return (
        <div>
            <div className="row">
                <h2>Lists the different restaurants that are available around you for your today's lunch</h2>
                <form>
                    <div className="form-group">
                        <label>Latitude</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Latitude"
                               value={latitude}
                               onChange={onChangeLatitude}/>
                    </div>
                    <div className="form-group">
                        <label>Longitude</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Latitude"
                               value={longitude}
                               onChange={onChangeLongitude}/>
                    </div>
                    <button className="btn btn-outline-secondary"
                            type="button"
                            onClick={findNearLocation}>Search
                    </button>
                    <button className="btn btn-outline-secondary"
                            type="button"
                            onClick={getLocation}>Get your location
                    </button>
                </form>
                {restaurants.map((restaurant) => {
                    const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
                    return (
                        <div className="pb-1">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                                        <strong>Address: </strong>{address}<br/>
                                        <strong>Distance: </strong>{Math.round(restaurant.distance) + " m"}
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