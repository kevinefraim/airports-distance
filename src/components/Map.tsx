/* google maps component */
/* Using directions prop in DIrectionsRenderer component to display the driving route between the two points */

import { useCallback, useMemo } from "react";
import { LatLngLiteral, MapOptions } from "types/maps";
import { MapProps } from "types/props";

import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({
  firstAirport,
  secondAirport,
  directions,
  onUnmount,
  setMap,
}: MapProps) => {
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 40.74819, lng: -73.986726 }),
    []
  );
  const mapOptions = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      mapId: "d539158592125f62",
    }),
    []
  );
  const onLoad = useCallback((map: any) => setMap(map), []);
  return (
    <GoogleMap
      zoom={12}
      center={center}
      onUnmount={onUnmount}
      mapContainerClassName="h-[100%] w-[100%]"
      options={mapOptions}
      onLoad={onLoad}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: { strokeWeight: 5, strokeColor: "#fff670" },
          }}
        />
      )}
      {!firstAirport && !secondAirport && <Marker position={center} />}
      {firstAirport && <Marker position={firstAirport} />}
      {secondAirport && <Marker position={secondAirport} />}
    </GoogleMap>
  );
};

export default Map;
