import React, {useEffect, useState,useCallback} from 'react'
import {GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, Autocomplete} from '@react-google-maps/api'
import axios from 'axios'







function Gmaps(props) {
    const {ID} = props

    const [lat, setLat] = useState(37.09024)
    const [lng, setLng] = useState(-95.712891)
    const [destination, setDestination] = useState('')
    

        axios
        .get(`http://localhost:8000/api/events/${ID}`, {
            withCredentials: true,
        })
        .then((res) => {
            const results = res.data.event.location
            const address = results.street + ", "+ results.city + ', ' + results.state
            console.log('results', address)
            setDestination(address)
            })
            .catch((err) => {
                console.log("Error with getOneEvent request", err);
            });
    

    useEffect(() => {
        const success = (pos) => {
            setLat(pos.coords.latitude)
            setLng(pos.coords.longitude)
        }
        const err = (error) => {
            console.error(error)
        } 
        navigator.geolocation.getCurrentPosition(success, err);
        
    },[])

    const center = { lat: lat, lng: lng }
    
    const apiKey = process.env.REACT_APP_API_KEY
    
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: ['places'],
    })
    
    const [map, setMap] = useState((null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')



    const onLoad = useCallback(function callback(map) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
            setMap(map)
        }, [center])

    async function calculateRoute(e, { destination}) {
        e.preventDefault()
        // console.log('center',center)
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: center,
            destination: destination,
          // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }


    
    return (
        isLoaded?
    <div> 
        <GoogleMap
            mapContainerStyle={{ width: '700px', height: '350px' }}
            zoom={10}
            center={center}
            onLoad={onLoad}
            options={{
                // zoomControl: false,
                streetViewControl: false,
                // mapTypeControl: false,
                // fullscreenControl: false,
            }}
        >
            
            {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
            )}
            <Marker position={center} title = 'Your locaton'/>
        </GoogleMap>

        <form onSubmit={(e) => calculateRoute(e, {destination})}>

            <Autocomplete>
                <input type='text' placeholder='Destination' value= {destination} onSelectCapture={(e) =>{setDestination(e.target.value)}}/>
            </Autocomplete>
            <input type="submit" value="GO"/>
        </form>
            <p>Distance : {distance}</p>
            <p>Duration : {duration}</p>
    </div>
    :
    <div></div>
)
}



export default Gmaps
