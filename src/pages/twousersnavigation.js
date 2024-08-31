import React, { useState, useEffect, useCallback, useRef } from "react";
import { GoogleMap, Marker, DirectionsRenderer, useLoadScript } from "@react-google-maps/api";
import Navbar from "../../Components/Home/Navbar";
import Footer from "../../Components/Home/Footer";
import Image from "next/image";
import Lottie from "lottie-react";
import earth from '../../public/earth.png'

const libraries = ["places", "directions"];

const MapComponent = ({ user1Location, user2Location }) => {
  const [destination, setDestination] = useState(null);
  const [directions1, setDirections1] = useState(null);
  const [directions2, setDirections2] = useState(null);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    const input = document.getElementById("pac-input");
    if (window.google && input) {
      searchBoxRef.current = new window.google.maps.places.SearchBox(input);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

      searchBoxRef.current.addListener("places_changed", () => {
        const places = searchBoxRef.current.getPlaces();
        if (places.length === 0) return;
        const place = places[0];
        setDestination(place.geometry.location);
      });
    }
  }, []);

  const calculateDirections = useCallback(() => {
    if (!user1Location || !user2Location || !destination || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    // Calculate directions for User 1
    directionsService.route(
      {
        origin: user1Location,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections1(result);
        } else {
          setError("Error calculating directions for User 1");
        }
      }
    );

    // Calculate directions for User 2
    directionsService.route(
      {
        origin: user2Location,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections2(result);
        } else {
          setError("Error calculating directions for User 2");
        }
      }
    );
  }, [user1Location, user2Location, destination]);

  useEffect(() => {
    if (destination) {
      calculateDirections();
    }
  }, [destination, calculateDirections]);

  return (
    <>
      <input
        id="pac-input"
        type="text"
        placeholder="Search for a destination"
        style={{
          boxSizing: 'border-box',
          border: '1px solid transparent',
          width: '240px',
          height: '32px',
          padding: '0 12px',
          borderRadius: '3px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          outline: 'none',
          textOverflow: 'ellipses',
          position: 'absolute',
          left: '50%',
          marginLeft: '-120px'
        }}
      />
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={4}
        center={user1Location || user2Location || { lat: 0, lng: 0 }}
        onLoad={onMapLoad}
      >
        {user1Location && (
          <Marker
            position={user1Location}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        )}
        {user2Location && (
          <Marker
            position={user2Location}
            icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          />
        )}
        {destination && <Marker position={destination} />}
        {directions1 && <DirectionsRenderer directions={directions1} options={{ polylineOptions: { strokeColor: 'blue' } }} />}
        {directions2 && <DirectionsRenderer directions={directions2} options={{ polylineOptions: { strokeColor: 'green' } }} />}
      </GoogleMap>
    </>
  );
};

const TwoUserNavigation = () => {
  const [user1Location, setUser1Location] = useState(null);
  const [user2Location, setUser2Location] = useState(null);
  const [showPrompt, setShowPrompt] = useState(true);
  const [error, setError] = useState(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://lottie.host/embed/f991717a-d3ad-4b7a-a14d-c09e810db2ec/n9YsR82xyP.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie animation:", error));
  }, []);


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const handleSubmitLocations = (e) => {
    e.preventDefault();
    const user1Lat = parseFloat(e.target.user1Lat.value);
    const user1Lng = parseFloat(e.target.user1Lng.value);
    const user2Lat = parseFloat(e.target.user2Lat.value);
    const user2Lng = parseFloat(e.target.user2Lng.value);

    if (isNaN(user1Lat) || isNaN(user1Lng) || isNaN(user2Lat) || isNaN(user2Lng)) {
      setError("Please enter valid coordinates for both users.");
      return;
    }

    setUser1Location({ lat: user1Lat, lng: user1Lng });
    setUser2Location({ lat: user2Lat, lng: user2Lng });
    setShowPrompt(false);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (

    <div className="">
      <Navbar />
      <div className="container ">
        <div class="maps">

          {showPrompt ? (
            <div style={{ padding: '20px' }}>
              <h2>Connect with your pals</h2>
              <div class="d-flex justify-content-center align-items-center" >
                <div class="col-lg-6">
                  <form onSubmit={handleSubmitLocations}>
                    <div>
                      <h3>My Location</h3>
                      <input type="number" className="mapinput" step="any" name="user1Lat" placeholder="Latitude" required />
                      <input type="number" className="mapinput" step="any" name="user1Lng" placeholder="Longitude" required />
                    </div>
                    <div>
                      <h3>Friend's location</h3>
                      <input type="number" className="mapinput" step="any" name="user2Lat" placeholder="Latitude" required />
                      <input type="number" className="mapinput" step="any" name="user2Lng" placeholder="Longitude" required />
                    </div>
                    <button type="submit" className="mapsubmit">Start Navigation</button>
                  </form>
                </div>
                <div className="col-lg-6 d-flex justify-content-center align-items-center">
                  <Image src={earth} alt="-"  width={320} className="spin-animation"/>
                </div>
              </div>
              {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </div>
          ) : (
            <div style={{ height: "100vh", width: "100%" }}>
              {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}
              {isLoaded && <MapComponent user1Location={user1Location} user2Location={user2Location} />}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TwoUserNavigation;