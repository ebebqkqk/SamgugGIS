interface LayerTogglesProps {
  showPlaces: boolean;
  showEvents: boolean;
  onShowPlacesChange: (value: boolean) => void;
  onShowEventsChange: (value: boolean) => void;
}

export function LayerToggles({
  showPlaces,
  showEvents,
  onShowPlacesChange,
  onShowEventsChange,
}: LayerTogglesProps) {
  return (
    <section className="panel-section" aria-labelledby="layers-title">
      <div className="section-heading" id="layers-title">
        레이어
      </div>
      <label className="toggle-row">
        <input
          checked={showPlaces}
          onChange={(event) => onShowPlacesChange(event.target.checked)}
          type="checkbox"
        />
        <span>지명</span>
      </label>
      <label className="toggle-row">
        <input
          checked={showEvents}
          onChange={(event) => onShowEventsChange(event.target.checked)}
          type="checkbox"
        />
        <span>전투/사건</span>
      </label>
    </section>
  );
}
