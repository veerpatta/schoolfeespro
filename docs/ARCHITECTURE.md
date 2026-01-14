# SchoolFeesPro — Architecture (v1)

## 1) Overview
- Single-page web app hosted on GitHub Pages
- Firebase Authentication for login (Google Sign-In)
- Firestore as database with Security Rules enforcing permissions

No server/backend for v1:
- No Cloud Functions
- No Firebase Storage (receipts generated client-side later)

## 2) Hosting
- GitHub Pages serves static build output.
- App uses HashRouter to avoid refresh routing issues on GitHub Pages.

## 3) Data model (high level)
Global:
- users/{uid} -> role, active flag
- config/app -> activeYearId
- years/{yearId} -> metadata (name, status)

Per year (years/{yearId}/...):
- students/{studentId}
- feeComponents/{componentId}
- transportRoutes/{routeId}
- optionalCategories/{categoryKey}
- ledgerEntries/{entryId} (append-only)
- promoCodes/{codeNorm}
- promoRequests/{requestId} (staff creates PENDING; director approves)
- promoRedemptions/{codeNorm}__{studentId} (lock)
- auditLogs/{logId} (append-only)

## 4) Security posture (must-have)
- Staff cannot create or edit fee components, promos, or students
- Staff can only create PAYMENT ledger entries in active year
- No one can update/delete ledger entries
- Archived years are read-only
- Audit logs are append-only

## 5) Repo structure (planned)
- docs/ : specs and architecture
- src/  : frontend app (to be scaffolded after blueprint commit)
