# Legacy Firestore Rules Backup

- **Firebase Project ID**: schoolfeespro
- **Backup Date/Time**: 2026-01-17T09:39:54+05:30
- **Note**: These legacy rules use custom claims and an `isTempAdmin()` bypass which is insecure. We are switching to a new schema based on `users/{uid}` document lookups.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function - check if user exists and get role from custom claims
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Check role from custom claims (set via Admin SDK)
    function hasRole(role) {
      return isAuthenticated() && request.auth.token.role == role;
    }
    
    // Alternative: Store roles in request context or use simpler checks
    function isPrincipal() {
      return hasRole('principal');
    }
    
    function isStaff() {
      return hasRole('staff') || hasRole('principal');
    }
    
    function isParent() {
      return hasRole('parent');
    }
    
    // TEMP: Allow all authenticated users (for initial setup)
    // Remove this after setting up proper roles
    function isTempAdmin() {
      return isAuthenticated();
    }
    
    // School Config
    match /schoolConfig/{document} {
      allow read: if isAuthenticated();
      allow write: if isTempAdmin(); // Change to isPrincipal() later
    }
    
    // Academic Years
    match /academicYears/{year} {
      allow read: if isAuthenticated();
      allow write: if isTempAdmin(); // Change to isPrincipal() later
    }
    
    // Students - nested under academic year
    match /students/{year}/{studentId} {
      allow read: if isAuthenticated();
      allow create, update: if isTempAdmin(); // Change to isStaff() later
      allow delete: if isTempAdmin(); // Change to isPrincipal() later
    }
    
    // Payments - nested under academic year
    match /payments/{year}/{paymentId} {
      allow read: if isAuthenticated();
      allow create: if isTempAdmin(); // Change to isStaff() later
      allow update, delete: if isTempAdmin(); // Change to isPrincipal() later
    }
    
    // Promo Codes
    match /promoCodes/{promoId} {
      allow read: if isAuthenticated();
      allow write: if isTempAdmin(); // Change to isPrincipal() later
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() && (request.auth.uid == userId || isTempAdmin());
      allow write: if isTempAdmin(); // Change to isPrincipal() later
    }
    
    // Audit Logs
    match /auditLogs/{logId} {
      allow read: if isTempAdmin(); // Change to isPrincipal() later
      allow create: if isAuthenticated();
      allow update, delete: if false; // Never allow modification
    }
    
    // Bulk Uploads
    match /bulkUploads/{uploadId} {
      allow read, write: if isTempAdmin(); // Change to isPrincipal() later
    }
    
    // Notifications
    match /notifications/{notificationId} {
      allow read: if isAuthenticated();
      allow write: if isTempAdmin(); // Change to isPrincipal() later
    }
  }
}
```
