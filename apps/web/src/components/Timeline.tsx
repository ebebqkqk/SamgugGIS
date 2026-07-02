import { timelineYears } from "../utils/time";

interface TimelineProps {
  year: number;
  onYearChange: (year: number) => void;
}

export function Timeline({ year, onYearChange }: TimelineProps) {
  return (
    <section className="panel-section" aria-labelledby="timeline-title">
      <div className="section-heading" id="timeline-title">
        연도
      </div>
      <div className="timeline-controls" role="group" aria-label="연도 선택">
        {timelineYears.map((item) => (
          <button
            className={item === year ? "year-button active" : "year-button"}
            key={item}
            onClick={() => onYearChange(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
