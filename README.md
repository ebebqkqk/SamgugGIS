# SamgugGIS

SamgugGIS는 삼국지의 지명, 전투, 세력 변화를 현대 지도 위에서 탐색하는 정적 웹 GIS 프로젝트입니다. 현재 목표는 서버 없이 동작하는 2D MVP를 먼저 만들고, 모든 지도 요소에 출처와 신뢰도 표시를 붙이는 것입니다.

## 현재 준비 상태

- `apps/web`: React + TypeScript + Vite 기반 웹 앱
- `apps/web/public/data`: 샘플 출처, 지명, 사건 데이터
- `docs`: 데이터 정책과 출처 로그 초안
- `data/raw`: CHGIS, DEM 같은 원본 데이터를 로컬에만 두는 위치이며 `.gitignore` 처리됨

## 실행

```bash
pnpm install
pnpm dev
```

웹 앱은 기본적으로 `http://127.0.0.1:5173`에서 실행됩니다.

## 빌드

```bash
pnpm build
```

## 배포

Vercel 배포 가능 상태입니다. Git 저장소를 연결한 뒤 Vercel Project Settings에서 `Root Directory`를 `apps/web`으로 지정하고, Framework Preset은 `Vite`, Build Command는 `pnpm build`, Output Directory는 `dist`를 사용합니다.

자세한 설정은 `docs/deployment.md`를 참고합니다.

## MVP 범위

- 중국/동아시아 중심 기본 지도
- 검증 기준점 3개: 성도, 한중, 형주 고성/강릉 기준점
- 전투/사건 레이어는 위치 검증 전까지 공개 앱에서 비활성화
- 연도 필터: 184, 190, 200, 208, 219, 234, 263
- 지명/사건 선택 시 출처, 신뢰도, 시기, 메모 표시

## 데이터 원칙

1. 모든 지도 요소는 `source_ids`를 가져야 합니다.
2. 위치가 확정적이지 않으면 `confidence`와 `accuracy_radius_m`을 함께 기록합니다.
3. CHGIS V6 같은 원본 데이터는 라이선스 제한 때문에 저장소에 커밋하지 않습니다.
4. OpenStreetMap 계열 데이터나 타일을 사용할 때는 저작자 표시와 ODbL 조건을 확인합니다.
5. 전투 위치처럼 이설이 큰 데이터는 CHGIS, 역사 지도, 정사 원문, 전문가 검수로 교차 확인하기 전까지 공개 앱에 넣지 않습니다.

현재 웹 화면에는 공개 가능한 공식/학술 출처 기준점만 표시한다는 주의 문구를 표시합니다.

## 주요 참고

- 프로젝트 계획서: `C:\Users\cheong\Desktop\SangokGIS_project_plan.pdf`
- CHGIS V6: https://chgis.fas.harvard.edu/data/chgis/v6/
- Chinese Text Project 삼국지: https://ctext.org/sanguozhi
- OpenStreetMap 저작권/라이선스: https://www.openstreetmap.org/copyright
- MapLibre GL JS: https://maplibre.org/maplibre-gl-js/docs/
