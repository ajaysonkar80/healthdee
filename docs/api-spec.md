# Healthdee API Spec (Current Implementation Snapshot)

_Base path: `/api`_

## 1) Envelope Contract

### Success
```json
{
  "success": true,
  "data": {},
  "meta": null
}
```

### Error
```json
{
  "success": false,
  "error": {
    "message": "Human readable message",
    "code": "OPTIONAL_MACHINE_CODE"
  }
}
```

## 2) Authentication

| Endpoint | Method | Auth | Purpose |
|---|---|---|---|
| `/auth/register` | POST | Public | Email registration or phone signup start |
| `/auth/login` | POST | Public | Email login (sets access/refresh cookies) |
| `/auth/otp/request` | POST | Public | Request phone OTP |
| `/auth/otp/verify` | POST | Public | Verify phone OTP |
| `/auth/password/forgot` | POST | Public | Request reset OTP for email |
| `/auth/password/reset` | POST | Public | Complete password reset |
| `/auth/refresh` | POST | Cookie refresh token | Rotate session token |
| `/auth/me` | GET | Access token | Get current authenticated user |
| `/auth/logout` | POST | Access token | Revoke/clear session cookies |

## 3) Domain APIs

| Endpoint | Method(s) | Auth | Notes |
|---|---|---|---|
| `/health` | GET | Public | DB connectivity health check |
| `/admin/metrics` | GET | Admin | Admin dashboard metrics |
| `/doctors` | GET | Auth + permission | Filtered doctor list |
| `/doctors/:id` | GET, PATCH | Auth | Read/update doctor profile |
| `/doctors/:id/verify` | POST | Admin | Verify/reject doctor |
| `/patients` | GET | Auth + permission | List patients (PII filtered by policy) |
| `/patients/:id` | GET, PATCH | Auth + access policy | Patient profile + ABHA profile update |
| `/users` | GET | Auth + permission | List users |
| `/users/:id` | GET, PATCH | Auth + access policy | Read user + update user status |
| `/appointments` | GET, POST | Auth | List appointments by role, create as patient |
| `/appointments/:id` | GET, PATCH | Auth | Read appointment, update status |

## 4) Auth Request Examples

### POST `/auth/register` (email)
```json
{
  "type": "email",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "StrongPass#123",
  "confirmPassword": "StrongPass#123"
}
```

### POST `/auth/register` (phone)
```json
{
  "type": "phone",
  "name": "Jane Doe",
  "phone": "9876543210"
}
```

### POST `/auth/login`
```json
{
  "type": "email",
  "email": "jane@example.com",
  "password": "StrongPass#123"
}
```

### POST `/auth/otp/request`
```json
{
  "phone": "+919876543210"
}
```

### POST `/auth/otp/verify`
```json
{
  "phone": "+919876543210",
  "otp": "1234"
}
```

## 5) Status & Enum Values (Important)

- User roles: `patient`, `doctor`, `admin`
- User status: `active`, `deactivated`, `deleted`
- Doctor verification: `pending`, `verified`, `rejected`
- Appointment status: `PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`

## 6) AuthN/AuthZ Notes

- Most protected routes use bearer token or `access_token` cookie fallback.
- Role checks are done through guard/policy modules.
- Unauthorized returns HTTP 401; forbidden access returns HTTP 403.
