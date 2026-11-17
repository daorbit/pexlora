import type { GeoLocation } from "@/lib/metadata/types";

const MAP_ZOOM = 15;

export function mapLink({ latitude, longitude }: GeoLocation) {
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=${MAP_ZOOM}/${latitude}/${longitude}`;
}

function toDms(value: number, positive: string, negative: string) {
  const absolute = Math.abs(value);
  const degrees = Math.floor(absolute);
  const minutesFull = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFull);
  const seconds = ((minutesFull - minutes) * 60).toFixed(1);
  return `${degrees}° ${minutes}′ ${seconds}″ ${value >= 0 ? positive : negative}`;
}

export function formatDms({ latitude, longitude }: GeoLocation) {
  return `${toDms(latitude, "N", "S")}, ${toDms(longitude, "E", "W")}`;
}

export function decimalCoordinates({ latitude, longitude }: GeoLocation) {
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
}

export function formatCoordinates({ latitude, longitude }: GeoLocation) {
  const lat = `${Math.abs(latitude).toFixed(5)}° ${latitude >= 0 ? "N" : "S"}`;
  const lng = `${Math.abs(longitude).toFixed(5)}° ${longitude >= 0 ? "E" : "W"}`;
  return `${lat}, ${lng}`;
}
