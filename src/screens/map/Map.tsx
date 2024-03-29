import { GOOGLE_MAPS_API_KEY } from "@env";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import useResizeMap from "../../hooks/useResizeMap";
import { useStore } from "../../stores/store";

const Map = () => {
  const { origin, destination } = useStore().mapStore;
  const [mapRef] = useResizeMap(origin, destination);

  useEffect(() => {
    if (origin && destination) {
      mapRef.current?.fitToCoordinates([{latitude: origin.location.lat, longitude: origin.location.lng}, {latitude: destination.location.lat, longitude: destination.location.lng,}],
        {edgePadding: {
          top: 60,
          right: 60,
          bottom: 60,
          left: 60,
        }})
    }
  }, [origin, destination, mapRef]);

  if (!origin) {
    return null;
  }

  return (
    <MapView
      ref={mapRef}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      style={{ flex: 1 }}
    >
      <Marker
        title="Origin"
        identifier="origin"
        description={origin.description}
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
      />
      {destination && (
        <>
          <Marker
            title="Destination"
            identifier="destination"
            description={destination.description}
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
          />
          <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="purple"
            lineDashPattern={[0]}
          />
        </>
      )}
    </MapView>
  );
};

export default observer(Map);
