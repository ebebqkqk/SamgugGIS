import { useCallback, useEffect, useMemo, useState } from "react";
import { DetailPanel } from "./components/DetailPanel";
import { EntityList } from "./components/EntityList";
import { LayerToggles } from "./components/LayerToggles";
import { SamgugMap } from "./components/SamgugMap";
import { Timeline } from "./components/Timeline";
import { loadEvents, loadPlaces, loadSources } from "./data/loaders";
import type { EventRecord, PlaceFeature, PlaceFeatureCollection, Selection, SourceRecord } from "./types/gis";
import { isEventVisibleAtYear, isPlaceVisibleAtYear } from "./utils/time";

export default function App() {
  const [sources, setSources] = useState<SourceRecord[]>([]);
  const [placesCollection, setPlacesCollection] = useState<PlaceFeatureCollection | null>(null);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [year, setYear] = useState(208);
  const [query, setQuery] = useState("");
  const [showPlaces, setShowPlaces] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    Promise.all([loadSources(), loadPlaces(), loadEvents()])
      .then(([nextSources, nextPlaces, nextEvents]) => {
        if (!mounted) {
          return;
        }

        setSources(nextSources);
        setPlacesCollection(nextPlaces);
        setEvents(nextEvents);
      })
      .catch((error: unknown) => {
        if (!mounted) {
          return;
        }

        setLoadError(error instanceof Error ? error.message : "데이터 로드 실패");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const allPlaces = placesCollection?.features ?? [];
  const visiblePlaces = useMemo(
    () => allPlaces.filter((place) => isPlaceVisibleAtYear(place, year)),
    [allPlaces, year],
  );
  const visibleEvents = useMemo(
    () => events.filter((event) => isEventVisibleAtYear(event, year)),
    [events, year],
  );

  const selectPlace = useCallback((place: PlaceFeature) => {
    setSelection({ kind: "place", item: place });
  }, []);

  const selectEvent = useCallback((event: EventRecord) => {
    setSelection({ kind: "event", item: event });
  }, []);

  useEffect(() => {
    if (!selection) {
      return;
    }

    if (selection.kind === "place" && !visiblePlaces.some((place) => place.properties.place_id === selection.item.properties.place_id)) {
      setSelection(null);
    }

    if (selection.kind === "event" && !visibleEvents.some((event) => event.event_id === selection.item.event_id)) {
      setSelection(null);
    }
  }, [selection, visibleEvents, visiblePlaces]);

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <h1>SamgugGIS</h1>
          <p>삼국지 역사 지리 인터랙티브 GIS</p>
        </div>
        <div className="header-status">
          <span>{year}</span>
          <small>year</small>
        </div>
      </header>

      <div className="workspace">
        <aside className="left-panel">
          <section className="data-notice" aria-label="데이터 검증 상태">
            <strong>Verified-reference MVP</strong>
            <span>공개 가능한 공식/학술 출처 기준점만 표시합니다. 논쟁적 전투 위치는 숨겼습니다.</span>
          </section>
          <Timeline onYearChange={setYear} year={year} />
          <LayerToggles
            onShowEventsChange={setShowEvents}
            onShowPlacesChange={setShowPlaces}
            showEvents={showEvents}
            showPlaces={showPlaces}
          />
          <EntityList
            events={visibleEvents}
            onQueryChange={setQuery}
            onSelectEvent={selectEvent}
            onSelectPlace={selectPlace}
            places={visiblePlaces}
            query={query}
            selection={selection}
          />
        </aside>

        <section className="map-region" aria-label="삼국지 GIS 지도">
          {loadError ? (
            <div className="load-error">{loadError}</div>
          ) : (
            <SamgugMap
              events={visibleEvents}
              onSelectEvent={selectEvent}
              onSelectPlace={selectPlace}
              places={visiblePlaces}
              selection={selection}
              showEvents={showEvents}
              showPlaces={showPlaces}
            />
          )}
        </section>

        <DetailPanel
          selection={selection}
          sources={sources}
          visibleEventCount={visibleEvents.length}
          visiblePlaceCount={visiblePlaces.length}
          year={year}
        />
      </div>
    </main>
  );
}
