
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

```
# Response
Success: 201 Created
On successful registration, the server returns a JWT token and the created user data. The password field is excluded from the response for security reasons.

# Response Example:

Error: 400 Bad Request
If validation fails, the server responds with a 400 status code along with details about the validation errors.

Error Response Example:

# Additional Information
Input validation for this endpoint is implemented in user.routes.js.
Password hashing and JWT token generation are handled in user.model.js.
The business logic for user creation is encapsulated in user.service.js.


# User Login Endpoint

## Endpoint
**POST** `/users/login`

## Description
This endpoint authenticates an existing user. The request body must be in JSON format and include the following fields:

## Request Body
| Field    | Type   | Required | Description                                               |
| -------- | ------ | -------- | --------------------------------------------------------- |
| email    | String | Yes      | Must be a valid email address and at least 6 characters long |
| password | String | Yes      | Must be at least 6 characters long                        |

## Request Example

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
### Example Response

- **User**: (Object):
    - **fullname**: (Object):
      - **firstname**: (String) Must be at least 3 characters long.
      - **lastname**: (String) If provided, must be at least 3 characters long.
    - **email**: (String) Must be a valid email address and at least 6 characters long.
    - **password**: (String) Must be at least 6 characters long.
- **token**: (String): JWT Token

## Request Example


Example Response

Success: 200 OK
On successful authentication, the server returns a JWT token and the authenticated user data, with the password field excluded for security reasons.

``` json
{
  "token": "generated_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

Error: 400 Bad Request
If input validation fails, the server responds with a 400 status code along with details about the validation errors.

``` json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be 6 character long",
      "param": "password",
      "location": "body"
    }
  ]
}

```

Error: 401 Unauthorized
If the provided email or password is incorrect, the server responds with a 401 status code.

``` json
{
  "message": "Invalid email or password"
}
```

### Additional Information

Input validation for both endpoints is implemented using express-validator in user.routes.js.
Password hashing and JWT token generation are handled in user.model.js.
The business logic for user creation and authentication is encapsulated within user.service.js and user.controller.js.


# User Profile Endpoint

## Endpoint
**GET** `/users/profile`

## Description
This endpoint retrieves the authenticated user's profile. A valid JWT token must be provided via the Authorization header or a cookie.

## Authentication
- **Header Example:** `Authorization: Bearer <token>`

## Example Response

### Success: 200 OK
Returns the user's profile details excluding sensitive information such as the password.

```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}

```
# User Logout Endpoint

## Endpoint
**GET** `/users/logout`


## Description
This endpoint logs out the authenticated user by invalidating the current JWT token, usually by blacklisting it, and clearing any associated cookies.

## Authentication
A valid JWT token is required.

## Example Response


### Success: 200 OK
Returns a success message confirming that the user has been logged out.

```json

{
  "message": "Logged out successfully"
}

```


### Additional Information

Input validation for both endpoints is implemented using express-validator in user.routes.js.
Password hashing and JWT token generation are handled in user.model.js.
The business logic for user creation and authentication is encapsulated within user.service.js and user.controller.js. ```