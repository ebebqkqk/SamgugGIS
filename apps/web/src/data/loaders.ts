import type { EventRecord, PlaceFeatureCollection, SourceRecord } from "../types/gis";

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${url} 로드 실패: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function loadSources() {
  return fetchJson<SourceRecord[]>("/data/sources.json");
}

export function loadPlaces() {
  return fetchJson<PlaceFeatureCollection>("/data/places.geojson");
}

export function loadEvents() {
  return fetchJson<EventRecord[]>("/data/events.json");
}
