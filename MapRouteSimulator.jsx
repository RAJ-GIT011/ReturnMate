import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const storeCoords = {
  'Dark Store': [28.6139, 77.2090],
  'Kirana A': [28.6149, 77.2150],
  'Kirana B': [28.6165, 77.2020],
  'Kirana C': [28.6110, 77.2250],
  'Customer': [28.6155, 77.2300],
};

// Helper: Interpolate between points
const interpolate = (start, end, factor) => [
  start[0] + (end[0] - start[0]) * factor,
  start[1] + (end[1] - start[1]) * factor,
];

// Helper: Distance (km) using Haversine
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const toRad = deg => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const RiderMarker = ({ route, replayKey }) => {
  const [position, setPosition] = useState(route[0]);
  const indexRef = useRef(0);
  const progressRef = useRef(0);
  const map = useMap();

  useEffect(() => {
    indexRef.current = 0;
    progressRef.current = 0;
    setPosition(route[0]);

    const interval = setInterval(() => {
      if (indexRef.current >= route.length - 1) return;

      progressRef.current += 0.02;

      if (progressRef.current >= 1) {
        indexRef.current++;
        progressRef.current = 0;
      }

      const nextPos = interpolate(
        route[indexRef.current],
        route[indexRef.current + 1],
        progressRef.current
      );

      setPosition(nextPos);
      map.panTo(nextPos);
    }, 100);

    return () => clearInterval(interval);
  }, [route, replayKey, map]);

  return (
    <Marker
      position={position}
      icon={L.divIcon({
        className: '',
        html: '<div style="font-size: 20px;">🛵</div>',
      })}
    >
      <Popup>Rider</Popup>
    </Marker>
  );
};

const MapRouteSimulator = ({ fallbackMatches, onComplete }) => {
  const [replayKey, setReplayKey] = useState(Date.now());
  const [etaMinutes, setEtaMinutes] = useState(null);

  const routePoints = [
    storeCoords['Dark Store'],
    ...Object.keys(fallbackMatches).map(k => storeCoords[k]),
    storeCoords['Customer'],
  ];

  // Calculate ETA once
  useEffect(() => {
    const totalDistance = routePoints.reduce((sum, curr, idx, arr) => {
      if (idx === 0) return 0;
      const [lat1, lon1] = arr[idx - 1];
      const [lat2, lon2] = curr;
      return sum + haversineDistance(lat1, lon1, lat2, lon2);
    }, 0);

    const speed = 30; // in km/h
    const eta = (totalDistance / speed) * 60; // in minutes
    setEtaMinutes(eta.toFixed(2));
  }, [fallbackMatches]);

  return (
    <div style={styles.wrapper}>
      <h2>🗺️ Rider Route + ETA</h2>

      <MapContainer
        center={storeCoords['Dark Store']}
        zoom={15}
        scrollWheelZoom={false}
        style={styles.map}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {['Dark Store', ...Object.keys(fallbackMatches), 'Customer'].map((label, i) => (
          <Marker key={i} position={storeCoords[label]}>
            <Popup>{label}</Popup>
          </Marker>
        ))}

        <Polyline positions={routePoints} color="#ff6f61" />

        <RiderMarker route={routePoints} replayKey={replayKey} />
      </MapContainer>

      <p style={{ marginTop: '15px' }}>
        ⏱ Estimated Delivery Time: <strong>{etaMinutes} minutes</strong>
      </p>

      <div style={styles.buttonBox}>
        <button onClick={() => setReplayKey(Date.now())} style={styles.secondaryBtn}>
          🔁 Replay Animation
        </button>
        <button onClick={onComplete} style={styles.primaryBtn}>
          ✅ Done with Route
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: '800px',
    margin: '30px auto',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  map: {
    height: '450px',
    width: '100%',
    borderRadius: '12px',
    marginTop: '10px',
  },
  buttonBox: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  primaryBtn: {
    padding: '10px 20px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  secondaryBtn: {
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default MapRouteSimulator;
