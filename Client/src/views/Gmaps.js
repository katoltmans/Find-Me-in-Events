import React, {useEffect, useState,useCallback} from 'react'
import {GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, Autocomplete} from '@react-google-maps/api'



function Gmaps() {

    const [lat, setLat] = useState(37.09024)
    const [lng, setLng] = useState(-95.712891)
    // const [center, setCenter] = useState({
    //     lat: 0,
    //     lng: 0
    // })

    useEffect(() => {}, [])

    useEffect(() => {
        const success = (pos) => {
            console.log(pos)
            setLat(pos.coords.latitude)
            setLng(pos.coords.longitude)
        }
        const err = (error) => {
            console.error(error)
        } 
        navigator.geolocation.getCurrentPosition(success, err);
        
    },[])
    
    // setCenter({lat:lat, lng:lng})
    const center = { lat: lat, lng: lng }
    
    
    
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAqda53MH6tUM80EqxZkk91dQsdrp9I9Cg',
        libraries: ['places'],
    })
    
    const [map, setMap] = useState((null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const [destination, setDestination] = useState('')


    const onLoad = useCallback(function callback(map) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
            setMap(map)
        }, [center])

    async function calculateRoute(e, { destination}) {
        e.preventDefault()
        console.log('center',center)
        // console.log(
        //     'origin :', origin,
        //     'destination:', destination
        // )
        // if (origin === '' || destination === '') {
        //     return
        // }
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

        <form onSubmit={(e) => calculateRoute(e, {origin, destination})}>

            <Autocomplete>
                <input type='text' placeholder='Destination' value={destination} onSelectCapture={(e) =>{setDestination(e.target.value)}}/>
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
