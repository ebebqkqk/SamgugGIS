import { useEffect, useMemo, useRef } from "react";
import maplibregl, { type Map as MapLibreMap } from "maplibre-gl";
import type { EventRecord, PlaceFeature, Selection } from "../types/gis";

const rasterStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
} as maplibregl.StyleSpecification;

interface SamgugMapProps {
  places: PlaceFeature[];
  events: EventRecord[];
  selection: Selection | null;
  showPlaces: boolean;
  showEvents: boolean;
  onSelectPlace: (place: PlaceFeature) => void;
  onSelectEvent: (event: EventRecord) => void;
}

export function SamgugMap({
  places,
  events,
  selection,
  showPlaces,
  showEvents,
  onSelectPlace,
  onSelectEvent,
}: SamgugMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: rasterStyle,
      center: [108.5, 31.5],
      zoom: 4,
      minZoom: 3,
      maxZoom: 9,
      attributionControl: {
        compact: true,
      },
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    map.addControl(new maplibregl.ScaleControl({ unit: "metric" }), "bottom-left");
    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const selectedId = useMemo(() => {
    if (!selection) {
      return null;
    }

    return selection.kind === "place" ? selection.item.properties.place_id : selection.item.event_id;
  }, [selection]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (showPlaces) {
      places.forEach((place) => {
        const marker = document.createElement("button");
        marker.className =
          selectedId === place.properties.place_id ? "map-marker place selected" : "map-marker place";
        marker.type = "button";
        marker.textContent = place.properties.name_ko;
        marker.setAttribute("aria-label", `${place.properties.name_ko} 위치`);
        marker.addEventListener("click", (event) => {
          event.stopPropagation();
          onSelectPlace(place);
        });

        const mapMarker = new maplibregl.Marker({ element: marker, anchor: "bottom", offset: [0, -8] })
          .setLngLat(place.geometry.coordinates)
          .addTo(map);
        markersRef.current.push(mapMarker);
      });
    }

    if (showEvents) {
      events.forEach((eventRecord) => {
        if (!eventRecord.location) {
          return;
        }

        const marker = document.createElement("button");
        marker.className =
          selectedId === eventRecord.event_id ? "map-marker event selected" : "map-marker event";
        marker.type = "button";
        marker.textContent = eventRecord.title;
        marker.setAttribute("aria-label", `${eventRecord.title} 위치`);
        marker.addEventListener("click", (event) => {
          event.stopPropagation();
          onSelectEvent(eventRecord);
        });

        const mapMarker = new maplibregl.Marker({ element: marker, anchor: "top", offset: [0, 8] })
          .setLngLat(eventRecord.location)
          .addTo(map);
        markersRef.current.push(mapMarker);
      });
    }
  }, [events, onSelectEvent, onSelectPlace, places, selectedId, showEvents, showPlaces]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !selection) {
      return;
    }

    const location =
      selection.kind === "place" ? selection.item.geometry.coordinates : selection.item.location;

    if (!location) {
      return;
    }

    map.easeTo({
      center: location,
      zoom: Math.max(map.getZoom(), 5),
      duration: 500,
    });
  }, [selection]);

  return (
    <div className="map-shell">
      <div className="map-container" ref={containerRef} />
    </div>
  );
}
