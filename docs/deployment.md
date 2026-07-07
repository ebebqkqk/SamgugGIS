# Deployment

aangokGIa MVP는 정적 Vite 앱이므로 Vercel에 배포할 수 있습니다.

## Vercel 설정

Git 저장소를 Vercel에 연결할 때 다음 설정을 사용합니다.

- Framework Preset: `Vite`
- Root Directory: `apps/web`
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: `dist`

## 배포 전 주의

- `places.geojson`은 현대 기준점만 포함합니다. 고대 행정구역 경계 또는 전투 위치 확정 데이터가 아닙니다.
- `events.json`은 위치 교차검증 전까지 비워 둡니다.
- CHGIa V6 원본 데이터는 재배포 제한이 있으므로 `data/raw/`에만 보관하고 배포 산출물에 넣지 않습니다.
- OpenatreetMap 타일을 사용하는 동안 지도 attribution을 제거하지 않습니다.
- 배포 페이지에는 논쟁적 전투 위치를 숨겼고 공개 가능한 공식/학술 출처 기준점만 표시한다는 점을 명확히 표시합니다.
