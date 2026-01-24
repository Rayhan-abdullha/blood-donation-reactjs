import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Polyline } from 'react-leaflet';
// আইকন সেটআপ
const redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// ম্যাপের ভিউ কন্ট্রোল করার জন্য ছোট ফাংশন
function SetViewOnClick({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [coords, map]);
  return null;
}

const MapSection = ({ userLocation, donors }: any) => {
  if (!userLocation) return null;

  return (
    <div className="h-[450px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white mt-10 relative z-0">
      <MapContainer 
        // কি (key) পরিবর্তন হলে ম্যাপ ফ্রেশ হয়ে রেন্ডার হবে
        key={`${userLocation.latitude}-${userLocation.longitude}-${donors.length}`} 
        center={[userLocation.latitude, userLocation.longitude]} 
        zoom={6} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={blueIcon}>
        <Popup>আপনি এখানে</Popup>
        </Marker>

        {/* ডোনারদের মার্কার লুপ */}

      {donors.map((donor: any) => {
      const lat = parseFloat(donor.latitude);
      const lng = parseFloat(donor.longitude);

      return (
        <React.Fragment key={donor.id}>
          <Marker position={[lat, lng]} icon={redIcon}>
            <Popup>
              <strong>{donor.name}</strong> <br/> 
              দূরত্ব: {donor.distance} কিমি
            </Popup>
          </Marker>

          {/* ইউজার থেকে ডোনার পর্যন্ত রেখা */}
          <Polyline 
            positions={[
              [userLocation.latitude, userLocation.longitude], // শুরু: ইউজারের লোকেশন
              [lat, lng] // শেষ: ডোনারের লোকেশন
            ]}
            pathOptions={{ 
              color: '#ef4444', // লাল রঙ
              weight: 2, 
              dashArray: '5, 10', // ড্যাশ লাইন (ডট ডট)
              opacity: 0.6 
            }} 
          />
        </React.Fragment>);
      })}
      <SetViewOnClick coords={[userLocation.latitude, userLocation.longitude]} />
      </MapContainer>
    </div>
  );
};

export default MapSection;