export type Confidence = "A" | "B" | "C" | "D";

export interface SourceRecord {
  source_id: string;
  title: string;
  type: string;
  author: string;
  year: number | null;
  url: string | null;
  license: string;
  notes: string;
}

export interface PlaceProperties {
  place_id: string;
  name_ko: string;
  name_zh: string;
  pinyin: string;
  modern_hint: string;
  time_from: number;
  time_to: number;
  confidence: Confidence;
  accuracy_radius_m: number | null;
  source_ids: string[];
  note: string;
}

export interface PointGeometry {
  type: "Point";
  coordinates: [number, number];
}

export interface PlaceFeature {
  type: "Feature";
  geometry: PointGeometry;
  properties: PlaceProperties;
}

export interface PlaceFeatureCollection {
  type: "FeatureCollection";
  features: PlaceFeature[];
}

export interface EventRecord {
  event_id: string;
  title: string;
  type: "battle" | "campaign" | "siege" | "movement" | "alliance";
  date_from: number;
  date_to: number;
  place_ids: string[];
  people: string[];
  summary: string;
  location: [number, number] | null;
  confidence: Confidence;
  source_ids: string[];
  note: string;
}

export type Selection =
  | { kind: "place"; item: PlaceFeature }
  | { kind: "event"; item: EventRecord };
