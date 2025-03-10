# API Docs

## Table of Contents
- [Groups](#groups)
  - [Create a Group](#create-a-group)
  - [List User's Groups](#list-users-groups)
  - [List All Groups](#list-all-groups)
  - [Update a Group](#update-a-group)
  - [Delete a Group](#delete-a-group)
- [Authentication API](#authentication-api)
  - [Login](#login)
  - [Test Token](#test-token)
  - [Get User Profile](#get-user-profile)
  - [Get User Profile](#get-user-profile)
- [Testcase API](#testcase-api)
  - [List Testcases](#list-testcases)
  - [Get a Testcase](#get-a-testcase)
  - [Create a Testcase](#create-a-testcase)
  - [Update a Testcase](#update-a-testcase)
  - [Delete a Testcase](#delete-a-testcase)

## Groups

This API allows users to create, list, update, and delete groups.

### Base URL

```
/api/group
```

---

### Create a Group

**Endpoint:**

```
POST /api/group/
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "id": "group_name"
}
```

**Responses:**

- `200 OK`: Group created successfully.
- `400 Bad Request`: Group ID is required.

---

### List User's Groups

**Endpoint:**

```
GET /api/group/
```

**Headers:**

```
Authorization: Bearer <token>
```

**Responses:**

- `200 OK`: Returns a list of groups created by the authenticated user.

**Example Response:**

```json
[
  {
    "id": "group1",
    "created_by": "user1",
    "created_at": "2025-03-10T12:00:00Z"
  }
]
```

---

### List All Groups

**Endpoint:**

```
GET /api/group/all
```

**Responses:**

- `200 OK`: Returns a list of all groups.

**Example Response:**

```json
[
  {
    "id": "group1",
    "created_by": "user1",
    "created_at": "2025-03-10T12:00:00Z"
  }
]
```

---

### Update a Group

**Endpoint:**

```
PUT /api/group/<id>
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "id": "new_group_name"
}
```

**Responses:**

- `200 OK`: Group updated successfully.
- `400 Bad Request`: Group ID is required.
- `404 Not Found`: Group not found.

---

### Delete a Group

**Endpoint:**

```
DELETE /api/group/<id>
```

**Headers:**

```
Authorization: Bearer <token>
```

**Responses:**

- `200 OK`: Group deleted successfully.
- `404 Not Found`: Group not found.

---

## Authentication API

This API handles user authentication, including login and token verification.

### Base URL

```
/api/auth
```

### Login

**Endpoint:**

```
POST /api/auth/login
```

**Request Body:**

```json
{
  "username": "user1",
  "password": "securepassword"
}
```

**Responses:**

- `200 OK`: Login successful, returns a JWT token.
- `400 Bad Request`: Username and password are required.
- `401 Unauthorized`: Invalid username or password.

**Example Response:**

```json
{
  "message": "Login successful",
  "token": "your.jwt.token"
}
```

---

### Test Token

**Endpoint:**

```
GET /api/auth/test-token
```

**Headers:**

```
Authorization: Bearer <token>
```

**Responses:**

- `200 OK`: Token is valid.
- `401 Unauthorized`: Token is invalid.

---

### Get User Profile

**Endpoint:**

```
GET /api/auth/profile
```

**Headers:**

```
Authorization: Bearer <token>
```

**Responses:**

- `200 OK`: Returns the authenticated user's profile.

**Example Response:**

```json
{
  "username": "user1",
  "role": "admin"
}
```

---

## Testcase API

This API allows users to create, list, update, and delete test cases.

### Base URL

```
/api/testcases
```

### List Testcases

**Endpoint:**

```
GET /api/testcases/
```

**Headers:**

```
Authorization: Bearer <token>
```

**Responses:**

- `200 OK`: Returns a list of test cases created by the authenticated user.

---

### Get a Testcase

**Endpoint:**

```
GET /api/testcases/<id>
```

**Headers:**

```
Authorization: Bearer <token>
```

**Responses:**

- `200 OK`: Returns the requested test case.
- `404 Not Found`: Test case not found.

---

### Create a Testcase

**Endpoint:**

```
POST /api/testcases/
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "group_id": "group1",
  "id": "testcase1",
  "title": "Sample Test",
  "description": "This is a test case",
  "data": "Test data"
}
```

**Responses:**

- `200 OK`: Test case created successfully.
- `400 Bad Request`: Missing required fields.

---

### Update a Testcase

**Endpoint:**

```
PUT /api/testcases/<id>
```

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "title": "Updated Test",
  "description": "Updated description",
  "data": "Updated test data"
}
```

**Responses:**

- `200 OK`: Test case updated successfully.
- `404 Not Found`: Test case not found.

---

### Delete a Testcase

**Endpoint:**

```
DELETE /api/testcases/<id>
```

**Headers:**

```
Authorization: Bearer <token>
```

**Responses:**

- `200 OK`: Test case deleted successfully.
- `404 Not Found`: Test case not found.

