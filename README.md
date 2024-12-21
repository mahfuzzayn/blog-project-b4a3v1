# Blog Project API

- **Live Server**: https://blog-project-mahfuzzayn.vercel.app/

Welcome to the **Blog Platform API**! This backend system powers a blogging platform where users can write, update, and delete their own blogs. The platform differentiates between two roles: **Admin** and **User**. Admins have privileges to manage users and blogs, while users can only manage their own blogs. The system includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Features

### 1. **User Roles**

- **Admin**:
    - Can create an admin user manually.
    - Can delete any blog.
    - Can block/unblock users by updating the `isBlocked` status.
    - Cannot create or update blogs.
- **User**:
    - Can register, log in, and create blogs.
    - Can update and delete their own blogs.
    - Cannot perform admin actions.

### 2. **Authentication & Authorization**

- **Authentication**: Users must be logged in to perform write, update, and delete operations.
- **Authorization**: Differentiates between Admin and User roles for secured access to different features.

### 3. **Blog Management**

- **Create Blog**: Logged-in users can create new blogs with a title and content.
- **Update Blog**: Users can update their own blogs.
- **Delete Blog**: Users can delete their own blogs.
- **Public API for Blogs**: Fetch all blogs with optional search, sort, and filter options.

### 4. **Admin Actions**

- **Block User**: Admins can block a user by updating the `isBlocked` field.
- **Delete Any Blog**: Admins can delete any blog by its ID.

## Tech Stack

The Blog Platform API is built using the following technologies:

- **Node.js**: A JavaScript runtime for building server-side applications.
- **Express.js**: A web framework for Node.js used to build APIs.
- **MongoDB**: A NoSQL database used for storing users, blogs, and other data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB used to define schemas and manage data.
- **TypeScript**: A statically typed superset of JavaScript for better tooling and error-checking.
- **JWT (JSON Web Tokens)**: Used for user authentication and authorization.
- **Bcrypt**: Library to hash and compare passwords securely.

## Getting Started

Follow the steps below to set up the Blog Platform API project locally.

### Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community) (locally or via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/mahfuzzayn/blog-project-b4a3v1.git
    cd blog-project-b4a3v1
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables in a `.env` file:

    ```env
    NODE_ENV=development
    DATABASE_URL=mongodb://localhost:27017/blog-project-b4a3v1
    PORT=5000
    BCRYPT_SALT_ROUNDS=number
    JWT_ACCESS_SECRET=your-secret-key
    JWT_ACCESS_EXPIRES_IN=day
    ```

4. Start the server:

    ```bash
    npm run start:dev
    ```

    The API will be running at [http://localhost:5000](http://localhost:5000).

## API Endpoints

Here are the available routes:

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login and receive a JWT token.

### Blog Management

- **POST /api/blogs**: Create a new blog (Requires Authorization).
- **PATCH /api/blogs/:id**: Update a specific blog (Requires Authorization).
- **DELETE /api/blogs/:id**: Delete a specific blog (Requires Authorization).
- **GET /api/blogs**: Get all blogs with optional search, sort, and filter.

### Admin Actions

- **PATCH /api/admin/users/:userId/block**: Admin can block/unblock a user.
- **DELETE /api/admin/blogs/:id**: Admin can delete any blog.

## Models

### User Model

- **name**: string
- **email**: string
- **password**: string (hashed)
- **role**: "admin" | "user" (default is "user")
- **isBlocked**: boolean (default is false)
- **createdAt**: Date
- **updatedAt**: Date

### Blog Model

- **title**: string
- **content**: string
- **author**: ObjectId (refers to the User)
- **isPublished**: boolean (default is true)
- **createdAt**: Date
- **updatedAt**: Date

## Error Handling

The API uses structured error responses for consistent user experience. Example error format:

```json
{
    "success": false,
    "message": "Error message",
    "statusCode": 400,
    "error": { "details": "Error details" },
    "stack": "Error stack trace"
}
```

Common error types:

- **Validation Error**: Invalid input data.
- **Not Found**: Resource not found.
- **Authentication Error**: Invalid or missing JWT token.
- **Authorization Error**: User doesn't have permission to perform the action.
- **Internal Server Error**: General server error.

Developed by [Mahfuz Zayn](https://mahfuzzayn.netlify.app/).
