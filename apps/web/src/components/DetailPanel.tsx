import type { Selection, SourceRecord } from "../types/gis";
import { formatYearRange } from "../utils/time";

interface DetailPanelProps {
  selection: Selection | null;
  sources: SourceRecord[];
  visiblePlaceCount: number;
  visibleEventCount: number;
  year: number;
}

function linkedSources(sourceIds: string[], sources: SourceRecord[]) {
  const sourceMap = new Map(sources.map((source) => [source.source_id, source]));
  return sourceIds.map((id) => sourceMap.get(id)).filter((source): source is SourceRecord => Boolean(source));
}

export function DetailPanel({
  selection,
  sources,
  visiblePlaceCount,
  visibleEventCount,
  year,
}: DetailPanelProps) {
  if (!selection) {
    return (
      <aside className="detail-panel">
        <div className="detail-kicker">{year}</div>
        <h2>삼국지 역사 GIS</h2>
        <p className="detail-summary">
          현재 시점에 표시되는 지명 {visiblePlaceCount}개, 사건 {visibleEventCount}개.
          공개 데이터는 공식/학술 출처와 신뢰도 메모를 함께 보관한다.
        </p>
        <div className="empty-state-metrics">
          <div>
            <span>{visiblePlaceCount}</span>
            <small>places</small>
          </div>
          <div>
            <span>{visibleEventCount}</span>
            <small>events</small>
          </div>
        </div>
      </aside>
    );
  }

  if (selection.kind === "place") {
    const place = selection.item.properties;
    const placeSources = linkedSources(place.source_ids, sources);

    return (
      <aside className="detail-panel">
        <div className="detail-kicker">지명</div>
        <div className="detail-title-row">
          <h2>{place.name_ko}</h2>
          <span className={`confidence confidence-${place.confidence.toLowerCase()}`}>
            {place.confidence}
          </span>
        </div>
        <div className="zh-name">
          {place.name_zh} · {place.pinyin}
        </div>
        <p className="detail-summary">{place.modern_hint}</p>
        <dl className="fact-grid">
          <div>
            <dt>시기</dt>
            <dd>{formatYearRange(place.time_from, place.time_to)}</dd>
          </div>
          <div>
            <dt>오차 반경</dt>
            <dd>{place.accuracy_radius_m ? `${place.accuracy_radius_m.toLocaleString()}m` : "미정"}</dd>
          </div>
        </dl>
        <section className="source-block">
          <h3>메모</h3>
          <p>{place.note}</p>
        </section>
        <section className="source-block">
          <h3>출처</h3>
          <SourceList sources={placeSources} />
        </section>
      </aside>
    );
  }

  const event = selection.item;
  const eventSources = linkedSources(event.source_ids, sources);

  return (
    <aside className="detail-panel">
      <div className="detail-kicker">사건</div>
      <div className="detail-title-row">
        <h2>{event.title}</h2>
        <span className={`confidence confidence-${event.confidence.toLowerCase()}`}>
          {event.confidence}
        </span>
      </div>
      <div className="zh-name">{formatYearRange(event.date_from, event.date_to)}</div>
      <p className="detail-summary">{event.summary}</p>
      <dl className="fact-grid">
        <div>
          <dt>유형</dt>
          <dd>{event.type}</dd>
        </div>
        <div>
          <dt>인물</dt>
          <dd>{event.people.join(", ")}</dd>
        </div>
      </dl>
      <section className="source-block">
        <h3>메모</h3>
        <p>{event.note}</p>
      </section>
      <section className="source-block">
        <h3>출처</h3>
        <SourceList sources={eventSources} />
      </section>
    </aside>
  );
}

function SourceList({ sources }: { sources: SourceRecord[] }) {
  if (sources.length === 0) {
    return <p className="source-note">연결된 출처가 없다.</p>;
  }

  return (
    <ul className="source-list">
      {sources.map((source) => (
        <li key={source.source_id}>
          {source.url ? (
            <a href={source.url} rel="noreferrer" target="_blank">
              {source.title}
            </a>
          ) : (
            <span>{source.title}</span>
          )}
          <small>{source.license}</small>
        </li>
      ))}
    </ul>
  );
}
