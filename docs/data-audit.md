# Data Audit

Last reviewed: 2026-07-07

## Audit Verdict

The public MVP now contains only modern reference points whose displayed data can be tied to reachable official sources. It does not publish battle coordinates, ancient administrative boundaries, CHGIS-derived geometry, or unverifiable heritage markers.

## Current Public Dataset

| Item | Public status | Coordinate basis | Source decision |
| --- | --- | --- | --- |
| Chengdu / 成都 | Included as modern reference point | NGA GNS `Chengdu` PPLA record: 104.066667, 30.666667 | Kept, but downgraded to `C` because it is a single modern gazetteer marker and not a verified historical boundary. |
| Hanzhong / 漢中 | Included as modern reference point | NGA GNS `Hanzhong` PPL record: 107.022143, 33.075072 | Kept as `B`; coordinate from GNS and modern/historical context from Hanzhong Municipal Government. |
| Jingzhou Ancient City / 荊州古城 / Jiangling | Removed from public dataset | Previous point was not independently tied to a reachable official heritage page | Removed until an official page, archive, or academic source can be accessed and logged. |
| Guandu | Excluded | Not published | Exact battlefield marker needs stronger historical GIS and literature verification. |
| Chibi | Excluded | Not published | Multiple location traditions; no single marker should be published yet. |
| Yiling | Excluded | Not published | Campaign/battle geography requires route and battlefield source review. |
| Fancheng | Excluded | Not published | Siege location should be split into Xiangyang/Fancheng context after source review. |

## Source Review

| Source | Institution type | Result | Public-use decision |
| --- | --- | --- | --- |
| NGA Geographic Names Server | U.S. government official gazetteer | Verified. GNS states it is the official repository for foreign geographic names and that coordinates are approximate finding-purpose values. | Allowed for modern reference-point coordinates only. |
| Hanzhong Municipal Government `汉中概况` | Local government | Verified live on 2026-07-07. UTF-8 body contains the municipal source, title, location overview, and historical-cultural context. | Allowed for Hanzhong modern context, not for exact ancient battlefield or commandery boundaries. |
| Jingzhou District heritage page | Local government | Not verified. The cited URL and related Jingzhou government domains timed out during review. | Removed from active public data until a reachable official/archive source is logged. |
| Scripta Sinica / Academia Sinica IHP | Academic primary-text database | Verified as a credible academic primary-text database. Site copyright notice forbids unauthorized reuse. | Research/citation aid only; no bulk text or direct coordinate data in public app. |
| CHGIS V6 | Harvard/Fudan historical GIS | Verified as credible research data, but license allows academic research only and prohibits commercial use, resale, or redistribution. | Local research reference only; no raw or derived CHGIS GIS data in Vercel/public repo. |
| OpenStreetMap | OpenStreetMap Foundation | Verified ODbL and attribution requirements. | Basemap/license source only; not evidence for historical claims. |

## Rules Applied

- If a source cannot be accessed or archived during review, it is not used for public claims.
- CHGIS and Scripta Sinica can support research notes, but they are not attached to public features unless the exact record and licensing implications are documented.
- `time_from` and `time_to` on current reference points are display-period fields for the MVP timeline, not evidence that the modern point itself existed with the same meaning from 184 to 263.
- Historical assertions such as ancient boundaries, capital status, routes, and battle sites require separate source notes before publication.

## Next Verification Work

1. Create `docs/source-notes/` entries before adding any historical event marker.
2. Find accessible official/archive or academic sources for Jingzhou/Jiangling before re-adding that marker.
3. For each future marker, record: source excerpt summary, source URL/archive, coordinate derivation method, uncertainty radius, and reviewer date.
4. Keep CHGIS raw data under `data/raw/` only and never include raw or derived CHGIS geometry in the public deployment without license clearance.
