import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";
import Navbar from "../../Components/Home/Navbar";

const libraries = ["places"];

const Garages = () => {
    const [garages, setGarages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [selectedGarage, setSelectedGarage] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const fetchNearbyGarages = useCallback((map, center) => {
        const service = new window.google.maps.places.PlacesService(map);
        const request = {
            location: center,
            radius: 1500,
            type: ["bike_repair"],
            keyword: "bike repair",
        };

        service.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                setGarages(results);
            } else {
                setError("No nearby bike garages found or an error occurred");
            }
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setCenter(userLocation);
                },
                (error) => {
                    console.error("Error getting user location:", error);
                    setError("Unable to get your location. Please enable location services.");
                    setLoading(false);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser");
            setLoading(false);
        }
    }, []);

    const onMapLoad = useCallback((map) => {
        if (center.lat !== 0 && center.lng !== 0) {
            fetchNearbyGarages(map, center);
        }
    }, [center, fetchNearbyGarages]);

    const openDirections = (garage) => {
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${garage.geometry.location.lat()},${garage.geometry.location.lng()}`;
        window.open(directionsUrl, "_blank");
    };

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps...</div>;

    return (
        <div>
            <Navbar />
            <GoogleMap
                center={center}
                zoom={14}
                onLoad={onMapLoad}
                mapContainerStyle={{ height: "400px", width: "100%" }}
            >
                {center.lat !== 0 && (
                    <Marker
                        position={center}
                        icon={{
                            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                        }}
                    />
                )}
                {garages.map((garage) => (
                    <Marker
                        key={garage.place_id}
                        position={garage.geometry.location}
                        onClick={() => setSelectedGarage(garage)}
                    />
                ))}
                {selectedGarage && (
                    <InfoWindow
                        position={selectedGarage.geometry.location}
                        onCloseClick={() => setSelectedGarage(null)}
                    >
                        <div>
                            <h3>{selectedGarage.name}</h3>
                            <p>{selectedGarage.vicinity}</p>
                            {selectedGarage.rating && (
                                <p>Rating: {selectedGarage.rating} ({selectedGarage.user_ratings_total} reviews)</p>
                            )}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
            <div>
                {loading ? (
                    <p>Loading nearby bike garages...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="garage-list">
                        {garages.map((garage) => (
                            <div class="garage-cards">
                                <div className="garage-card" key={garage.place_id}>
                                    <h4>{garage.name}</h4>
                                    <p>{garage.vicinity}</p>
                                    {garage.rating && <p>Rating: {garage.rating}</p>}
                                    <button onClick={() => openDirections(garage)} className="directions">Get Directions</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Garages;
