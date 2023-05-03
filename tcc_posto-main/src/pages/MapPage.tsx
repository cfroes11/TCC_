import React from 'react';
import NavBar from "../components/NavBar/NavBar"
import {
    GoogleMap,  
    Marker,
    LoadScript,
    StandaloneSearchBox,
    DirectionsService,
    DirectionsRenderer,
} from '@react-google-maps/api';

export interface MapPageProps {}

const MapPage = () => {

    const [map, setMap] = React.useState<google.maps.Map>();
    const [searchBoxA, setSearchBoxA] = React.useState<google.maps.places.SearchBox>();
    const [searchBoxB, setSearchBoxB] = React.useState<google.maps.places.SearchBox>();
    const [pointA, setPointA] = React.useState<google.maps.LatLngLiteral>();
    const [pointB, setPointB] = React.useState<google.maps.LatLngLiteral>();

    const [origin, setOrigin] = React.useState<google.maps.LatLngLiteral | null>(null);
    const [destination, setDestination] = React.useState<google.maps.LatLngLiteral | null>(null);
    
    const [response, setResponse] = React.useState<google.maps.DistanceMatrixResponse | null>(null);
 
    const myPosition = {
        lat: -23.224116672654603, 
        lng: -45.92338182519008,
    };

    const onMapLoad = (map: google.maps.Map) => {
        setMap(map);
    };

    const onLoadA = (ref: google.maps.places.SearchBox) => {
        setSearchBoxA(ref);
    };
    const onLoadB = (ref: google.maps.places.SearchBox) => {
        setSearchBoxB(ref);
    };

    const onPlacesChangedA = () => {
        const places  = searchBoxA!.getPlaces();
        console.log(places);
        const place = places![0];
        const location = {
            lat: place?.geometry?.location?.lat() || 0,
            lng: place?.geometry?.location?.lng() || 0,
        };
        setPointA(location);
        setOrigin(null);
        setDestination(null);
        setResponse(null);
        map?.panTo(location);
    };
    const onPlacesChangedB = () => {
        const places  = searchBoxB!.getPlaces();
        console.log(places);
        const place = places![0];
        const location = {
            lat: place?.geometry?.location?.lat() || 0,
            lng: place?.geometry?.location?.lng() || 0,
        };
        setPointB(location);
        setOrigin(null);
        setDestination(null);
        setResponse(null);
        map?.panTo(location);
    };

    const traceRoute = () => {
        if (pointA && pointB){
            setOrigin(pointA);
            setDestination(pointB);
        }
    };

    //@ts-ignore
    const directionServiceOptions = React.useMemo<google.maps.DirectionsRequest>(() => {
        return {
            origin,
            destination,
            travelMode: "DRIVING",
        };
    }, [origin, destination]);

    const directionsCallback = React.useCallback((res: any) => {
        if (res !== null && res.status === "OK"){
            setResponse(res);
        } else {
            console.log(res);
        }
    }, []);

    const directionsRenderOptions = React.useMemo<any>(() => {
        return {
            directions: response,
        };
    }, [response]);

    return (
        <div className='map'>
            <NavBar/>
            <LoadScript
                googleMapsApiKey='AIzaSyDK1DZ3AImIWAFQyfdxlXVY2VxlG3CnxEg'
                libraries={["places"]}
            >
                <GoogleMap
                onLoad={onMapLoad}
                mapContainerStyle={{width: "100%", height: "100%"}}
                center={myPosition}
                zoom={15}
            >
                <div className="address">
                    <StandaloneSearchBox
                        onLoad={onLoadA}
                        onPlacesChanged={onPlacesChangedA}
                    >
                        <input
                            className='address-field'
                            placeholder='Digite o endereço inicial'
                        />
                    </StandaloneSearchBox>
                    <StandaloneSearchBox
                        onLoad={onLoadB}
                        onPlacesChanged={onPlacesChangedB}
                    >
                        <input
                            className='address-field'
                            placeholder='Digite o endereço final'
                        />
                    </StandaloneSearchBox>
                    <button onClick={traceRoute}>Traçar Rota</button>
                </div>

                {!response && pointA && <Marker position={pointA}/>}
                {!response && pointB && <Marker position={pointB}/>}

                {origin && destination && (
                    <DirectionsService 
                        options={directionServiceOptions}
                        callback={directionsCallback}
                    />
                )}

                {response && directionsRenderOptions && (
                    <DirectionsRenderer options={directionsRenderOptions}/>
                )}
            </GoogleMap>
        </LoadScript>
        </div>
    );
}

export default MapPage;