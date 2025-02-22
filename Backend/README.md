
# Backend API Documentation

# User Registration Endpoint

## Endpoint
**POST** `/users/register`

## Description
This endpoint registers a new user. The request body must be in JSON format and include the following fields:

## Request Body
| Field            | Type   | Required | Description                                                |
| ---------------- | ------ | -------- | ---------------------------------------------------------- |
| fullname         | Object | Yes      | An object containing the user's name details               |
| ├─ firstname     | String | Yes      | Must be at least 3 characters long                         |
| └─ lastname      | String | No       | If provided, must be at least 3 characters long             |
| email            | String | Yes      | Must be a valid email address and at least 6 characters long  |
| password         | String | Yes      | Must be at least 6 characters long                          |

## Request Example


- **fullname**: An object containing:
  - **firstname**: **Required.** Must be at least 3 characters long.
  - **lastname**: _Optional._ If provided, must be at least 3 characters long.
- **email**: **Required.** Must be a valid email address and at least 6 characters long.
- **password**: **Required.** Must be at least 6 characters long.


## Example Response

- **User**: (Object):
    - **fullname**: (Object):
      - **firstname**: (String) Must be at least 3 characters long.
      - **lastname**: (String) If provided, must be at least 3 characters long.
    - **email**: (String) Must be a valid email address and at least 6 characters long.
    - **password**: (String) Must be at least 6 characters long.
- **token**: (String): JWT Token

## Request Example

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}

Response
Success: 201 Created
On successful registration, the server returns a JWT token and the created user data. The password field is excluded from the response for security reasons.

Response Example:

Error: 400 Bad Request
If validation fails, the server responds with a 400 status code along with details about the validation errors.

Error Response Example:

Additional Information
Input validation for this endpoint is implemented in user.routes.js.
Password hashing and JWT token generation are handled in user.model.js.
The business logic for user creation is encapsulated in user.service.js.
