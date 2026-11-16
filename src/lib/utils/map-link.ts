import type { GeoLocation } from "@/lib/metadata/types";

const MAP_ZOOM = 15;

export function mapLink({ latitude, longitude }: GeoLocation) {
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${MAP_ZOOM}/${latitude}/${longitude}`;
}

export function formatCoordinates({ latitude, longitude }: GeoLocation) {
  const lat = `${Math.abs(latitude).toFixed(5)}° ${latitude >= 0 ? "N" : "S"}`;
  const lng = `${Math.abs(longitude).toFixed(5)}° ${longitude >= 0 ? "E" : "W"}`;
  return `${lat}, ${lng}`;
}
