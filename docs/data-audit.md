# Data Audit

## Current Public Dataset

The public MVP intentionally contains only modern reference points and no battle/event coordinates.

| Item | Public status | Reason |
| --- | --- | --- |
| Chengdu / 成都 | Included as modern reference point | Key Shu-Han location, but public marker is not an ancient boundary. |
| Hanzhong / 漢中 | Included as modern reference point | Official Hanzhong overview confirms modern regional context. |
| Jingzhou Ancient City / 荊州古城 | Included as modern reference point | Official Jingzhou District heritage page is cited; ancient Jingzhou province boundary is not shown. |
| Guandu | Excluded | Exact battlefield marker needs stronger historical GIS and literature verification. |
| Chibi | Excluded | Multiple location traditions; no single marker should be published yet. |
| Yiling | Excluded | Campaign/battle geography requires route and battlefield source review. |
| Fancheng | Excluded | Siege location should be split into Xiangyang/Fancheng historical context after source review. |

## Source Rules

- CHGIS V6 is allowed as a local research reference only because its license prohibits redistribution.
- Scripta Sinica is allowed for manual primary-text verification, not bulk text reuse.
- NGA GNS is allowed for modern reference-point coordinates; it is not a historical source.
- Local government pages are allowed for modern administrative and heritage context.

## Next Verification Work

1. Download CHGIS V6 locally into `data/raw/`.
2. Verify whether each historical placename exists in the relevant time slice.
3. Record only citation metadata in the public repo unless redistribution permission is obtained.
4. For each battle, create a `docs/source-notes/<event>.md` note before adding a marker.
