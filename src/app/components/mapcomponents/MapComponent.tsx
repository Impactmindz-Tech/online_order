import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// const icon = L.icon({
//   iconUrl: "../../../assests/placeholder.jpg",
//   iconSize: [38, 38],
// });

// Extend the L.Icon.Default class to set the default options
class DefaultIcon extends L.Icon.Default {
  constructor() {
    super();
    this.options.iconRetinaUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
    this.options.iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
    this.options.shadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";
  }
}

// Apply the extended default icon options
L.Icon.Default.prototype = new DefaultIcon();

const position: [number, number] = [51.505, -0.09];

interface RecentCenterViewProps {
  selectPosition: any;
}

const RecentCenterView: React.FC<RecentCenterViewProps> = ({ selectPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(L.latLng(selectPosition?.lat, selectPosition?.lon), map.getZoom(), {
        animate: true,
      });
    }
  }, [selectPosition, map]);

  return null;
}

interface MapComponentProps {
  selectPosition: any;
}

const MapComponent: React.FC<MapComponentProps> = ({ selectPosition }) => {
  const locationSelection: [number, number] = selectPosition ? [parseFloat(selectPosition?.lat), parseFloat(selectPosition?.lon)] : position;

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=eA3MBleCC9aTtUBJHL6C"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectPosition && (
        <Marker position={locationSelection}>
          <Popup>You are here</Popup>
        </Marker>
      )}
      <RecentCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
};

export default MapComponent;
