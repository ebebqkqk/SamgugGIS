import type { EventRecord, PlaceFeature, Selection } from "../types/gis";
import { formatYearRange } from "../utils/time";

interface EntityListProps {
  places: PlaceFeature[];
  events: EventRecord[];
  selection: Selection | null;
  query: string;
  onQueryChange: (value: string) => void;
  onSelectPlace: (place: PlaceFeature) => void;
  onSelectEvent: (event: EventRecord) => void;
}

export function EntityList({
  places,
  events,
  selection,
  query,
  onQueryChange,
  onSelectPlace,
  onSelectEvent,
}: EntityListProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const filteredPlaces = places.filter((place) => {
    const text = [
      place.properties.name_ko,
      place.properties.name_zh,
      place.properties.pinyin,
      place.properties.modern_hint,
    ]
      .join(" ")
      .toLowerCase();
    return text.includes(normalizedQuery);
  });
  const filteredEvents = events.filter((event) => {
    const text = [event.title, event.summary, event.people.join(" ")].join(" ").toLowerCase();
    return text.includes(normalizedQuery);
  });

  return (
    <section className="panel-section entity-list" aria-labelledby="entities-title">
      <div className="section-heading" id="entities-title">
        탐색
      </div>
      <input
        aria-label="지명과 사건 검색"
        className="search-input"
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="지명, 사건, 인물"
        type="search"
        value={query}
      />
      <div className="entity-group">
        <div className="entity-group-title">지명</div>
        {filteredPlaces.map((place) => (
          <button
            className={
              selection?.kind === "place" &&
              selection.item.properties.place_id === place.properties.place_id
                ? "entity-row active"
                : "entity-row"
            }
            key={place.properties.place_id}
            onClick={() => onSelectPlace(place)}
            type="button"
          >
            <span>{place.properties.name_ko}</span>
            <span className={`confidence confidence-${place.properties.confidence.toLowerCase()}`}>
              {place.properties.confidence}
            </span>
          </button>
        ))}
      </div>
      <div className="entity-group">
        <div className="entity-group-title">사건</div>
        {filteredEvents.map((event) => (
          <button
            className={
              selection?.kind === "event" && selection.item.event_id === event.event_id
                ? "entity-row active"
                : "entity-row"
            }
            key={event.event_id}
            onClick={() => onSelectEvent(event)}
            type="button"
          >
            <span>{event.title}</span>
            <span className="entity-year">{formatYearRange(event.date_from, event.date_to)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
