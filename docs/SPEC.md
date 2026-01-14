# SchoolFeesPro — Product Spec (v1)

## 1) Summary
A fee management system for VPPS that supports academic years, calculates total fees from configurable components (class/transport/boarding/categories), tracks payments via an append-only ledger, and provides promo/discount handling via Director approval.

## 2) Users & Roles
### DIRECTOR
- Manage academic years (create/activate/archive)
- Configure fee components (class/transport route/boarding/optional categories)
- Create students and set fee profile parameters
- Approve/reject promo requests and apply discounts
- View audit logs and reports

### STAFF
- Search students
- Record payments (PAYMENT entries only)
- Generate/print receipt view (PDF later)
- Create promo requests (PENDING)

(Parent portal is out of scope for v1.)

## 3) Fee model (component-based)
Total fee for a student in a year = sum of applicable components:
- Class-based components (e.g., Tuition for Class 6)
- Transport route component (if assigned)
- Boarding type component (if assigned)
- Optional category components (if selected)

Staff must never type total fee manually.

## 4) Payments & due calculation
- Financial records are append-only (no update/delete).
- Staff can create PAYMENT entries only.
- Director can create DISCOUNT / ADJUSTMENT / REFUND entries.
- Due = computed total fee - payments - discounts + adjustments - refunds (per business rules).

## 5) Promo workflow (Director approval)
- Staff creates promo request: status = PENDING
- Director approves/rejects
- On approval, Director applies discount (as a ledger entry) and creates a redemption lock to prevent reuse

## 6) Reports (v1)
- Daily collection report (by date & payment mode)
- Dues/defaulters list (students with due > 0)

## 7) Non-goals (v1)
- Online payment gateway
- SMS/WhatsApp automation
- Cloud Functions / Storage
- Parent login portal
