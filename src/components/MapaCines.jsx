import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Ícono personalizado
const iconoCine = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [35, 35],
});

export function MapaCines() {
    const [posicionUsuario, setPosicionUsuario] = useState(null);
    const [lugaresCine, setLugaresCine] = useState([]);

    // Obtener ubicación del usuario
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setPosicionUsuario([latitude, longitude]);

                // Aquí llamamos a una API externa para buscar cines cerca
                obtenerCinesCercanos(latitude, longitude);
            },
            (error) => {
                console.error("Error obteniendo ubicación", error);
            }
        );
    }, []);

    const obtenerCinesCercanos = async (lat, lon) => {
        // Ejemplo con OpenStreetMap + Overpass API (gratuito y sin clave)
        const consulta = `
      [out:json];
      node["amenity"="cinema"](around:5000,${lat},${lon});
      out;
    `;

        const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: consulta,
        });

        const data = await response.json();
        const lugares = data.elements.map((cine) => ({
            lat: cine.lat,
            lon: cine.lon,
            nombre: cine.tags.name || "Cine sin nombre",
        }));

        setLugaresCine(lugares);
        console.log(lugares);
        
    };

    if (!posicionUsuario) return <p>Obteniendo ubicación...</p>;

    return (
        <MapContainer center={posicionUsuario} zoom={14} style={{ height: "60vh", width: "100%" }}>
            <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marcador del usuario */}
            <Marker position={posicionUsuario}>
                <Popup>¡Estás aquí!</Popup>
            </Marker>

            {/* Marcadores de cines */}
            {lugaresCine.map((cine, i) => (
                <Marker key={i} position={[cine.lat, cine.lon]} icon={iconoCine}>
                    <Popup>
                        <strong>{cine.nombre}</strong>
                        <br />
                        📍 Coordenadas: {cine.lat.toFixed(4)}, {cine.lon.toFixed(4)}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
