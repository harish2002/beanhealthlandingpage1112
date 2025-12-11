# BeanHealth Landing Page - API Contracts

## Overview
This document defines the backend API contracts for the BeanHealth landing page demo request form.

## Database Schema

### Collection: `demo_requests`

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, validated),
  lookingFor: String (required),
  status: String (enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new'),
  createdAt: DateTime (auto-generated),
  updatedAt: DateTime (auto-generated)
}
```

## API Endpoints

### POST /api/demo-request
Submit a new demo request

**Request Body:**
```json
{
  "name": "Dr. Rajesh Kumar",
  "email": "rajesh@apollohospitals.com",
  "lookingFor": "CKD monitoring solution for 200+ patients"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Demo request submitted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Dr. Rajesh Kumar",
    "email": "rajesh@apollohospitals.com",
    "lookingFor": "CKD monitoring solution for 200+ patients",
    "status": "new",
    "createdAt": "2025-12-11T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Invalid email format"
  }
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Failed to submit demo request"
}
```

### GET /api/demo-requests
Get all demo requests (for admin use)

**Success Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Dr. Rajesh Kumar",
      "email": "rajesh@apollohospitals.com",
      "lookingFor": "CKD monitoring solution",
      "status": "new",
      "createdAt": "2025-12-11T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

## Frontend Integration

### Current Mock Implementation (to be replaced)
File: `/app/frontend/src/mock.js`
- `submitDemoRequest()` - Currently stores data locally
- Needs to be replaced with actual API call

### New Implementation
File: `/app/frontend/src/pages/LandingPage.jsx`
- Replace `submitDemoRequest()` from mock.js
- Use axios to POST to `/api/demo-request`
- Handle success/error responses
- Show appropriate toast notifications

## Validation Rules

### Backend Validation
- **name**: Required, min 2 characters, max 100 characters
- **email**: Required, valid email format
- **lookingFor**: Required, min 10 characters, max 1000 characters

### Frontend Validation
- All fields marked as required in HTML form
- Email input uses HTML5 email validation
- Form cannot be submitted if fields are empty

## Status Flow
1. **new** - Initial status when demo request is created
2. **contacted** - When sales team reaches out
3. **qualified** - When prospect is qualified as potential customer
4. **closed** - When deal is won/lost or request is resolved
