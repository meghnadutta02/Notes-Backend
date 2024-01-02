Below is the documentation for the API endpoints:

## API Endpoints

### User Authentication

#### Register User

- **Endpoint:** `POST /api/auth/register`
- **Description:** Register a new user.
- **Request Body:**
  - `name` (string): User's name.
  - `email` (string): User's email address.
  - `password` (string): User's password.
- **Response:**
  - `201 Created`: User registered successfully.
    - Response body:
      - `_id` (string): User ID.
      - `name` (string): User's name.
      - `email` (string): User's email.
      - `isAdmin` (boolean): Indicates whether the user is an admin.
  - `400 Bad Request`: Invalid input fields or user already exists.
  - `500 Internal Server Error`: Server error.

#### Login User

- **Endpoint:** `POST /api/auth/login`
- **Description:** Log in an existing user.
- **Request Body:**
  - `email` (string): User's email address.
  - `password` (string): User's password.
  - `doNotLogout` (boolean, optional): If true, the login session won't expire.
- **Response:**
  - `200 OK`: User logged in successfully.
    - Response body:
      - `_id` (string): User ID.
      - `name` (string): User's name.
      - `email` (string): User's email.
      - `isAdmin` (boolean): Indicates whether the user is an admin.
      - `doNotLogout` (boolean): If true, the login session won't expire.
  - `401 Unauthorized`: Wrong credentials.
  - `400 Bad Request`: Account does not exist or missing input fields.
  - `500 Internal Server Error`: Server error.

### Notes

#### Create Note

- **Endpoint:** `POST /api/notes/create`
- **Description:** Create a new note.
- **Authentication:** Requires a valid access token in the request cookies.
- **Request Body:**
  - `title` (string): Title of the note.
  - `content` (string): Content of the note.
- **Response:**
  - `201 Created`: Note created successfully.
    - Response body: Created note object.
  - `400 Bad Request`: Missing or invalid input fields.
  - `403 Unauthorized`: Missing or invalid access token.
  - `500 Internal Server Error`: Server error.

#### Get All Notes

- **Endpoint:** `GET /api/notes`
- **Description:** Get all notes for the currently logged-in user.
- **Authentication:** Requires a valid access token in the request cookies.
- **Response:**
  - `200 OK`: Notes retrieved successfully.
    - Response body: Array of note objects.
  - `403 Unauthorized`: Missing or invalid access token.
  - `500 Internal Server Error`: Server error.

#### Get Note by ID

- **Endpoint:** `GET /api/notes/:id`
- **Description:** Get a specific note by ID.
- **Authentication:** Requires a valid access token in the request cookies.
- **Response:**
  - `200 OK`: Note retrieved successfully.
    - Response body: Note object.
  - `403 Unauthorized`: Missing or invalid access token.
  - `404 Not Found`: Note not found.
  - `500 Internal Server Error`: Server error.

#### Update Note

- **Endpoint:** `PUT /api/notes/:id`
- **Description:** Update a specific note by ID.
- **Authentication:** Requires a valid access token in the request cookies.
- **Request Body:**
  - `title` (string): Updated title of the note.
  - `content` (string): Updated content of the note.
- **Response:**
  - `200 OK`: Note updated successfully.
    - Response body: Updated note object.
  - `400 Bad Request`: Missing or invalid input fields.
  - `403 Unauthorized`: Missing or invalid access token.
  - `404 Not Found`: Note not found.
  - `500 Internal Server Error`: Server error.

#### Delete Note

- **Endpoint:** `DELETE /api/notes/:id`
- **Description:** Delete a specific note by ID.
- **Authentication:** Requires a valid access token in the request cookies.
- **Response:**
  - `200 OK`: Note deleted successfully.
    - Response body: `{ message: "Note deleted successfully" }`.
  - `403 Unauthorized`: Missing or invalid access token.
  - `404 Not Found`: Note not found.
  - `500 Internal Server Error`: Server error.

### Error Handling

- For any request that results in an error, the response will include an appropriate status code and an error message in the response body.
- The server may respond with a `500 Internal Server Error` for unexpected issues.

### Testing

- Unit tests are available for the authentication and note-related endpoints using Jest and Supertest.
- Run tests using `npm test`.
