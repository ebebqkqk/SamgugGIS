import type { EventRecord, PlaceFeature } from "../types/gis";

export const timelineYears = [184, 190, 200, 208, 219, 234, 263];

export function isPlaceVisibleAtYear(place: PlaceFeature, year: number) {
  return place.properties.time_from <= year && year <= place.properties.time_to;
}

export function isEventVisibleAtYear(event: EventRecord, year: number) {
  return event.date_from <= year && year <= event.date_to;
}

export function formatYearRange(from: number, to: number) {
  return from === to ? `${from}` : `${from}-${to}`;
}
