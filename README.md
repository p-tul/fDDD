# Functional Domain-Driven Design Example

This repository is a sample project demonstrating the principles of Functional Domain-Driven Design (fDDD) in TypeScript. It models a simple Restaurant Reservation System to showcase how to build a robust, testable, and maintainable application by separating core logic from infrastructure.

## Core Principles Demonstrated

This project is built to be an exemplary showcase of the following software design principles:

1.  **Functional Core, Imperative Shell:** The core business logic is written as pure, side-effect-free functions, while side effects (like database interactions, logging, or API communication) are handled at the edges of the application (the "shell").

2.  **Immutable Data Structures:** All data types used in the domain (`Reservation`, `TimeSlot`, etc.) are treated as immutable. We don't modify state; we create new states.

3.  **Explicit Error Handling:** The domain logic never throws exceptions. Instead, it returns a `Result` type (`{ success: true, value: T }` or `{ success: false, error: E }`), making all possible outcomes explicit and forcing the caller to handle them.

4.  **Dependency Inversion Principle:** The application and domain layers depend on abstractions (interfaces), not on concrete implementations. This allows the infrastructure (like the database) to be swapped out with minimal changes to the core application.

5.  **Schema-based Validation:** All incoming data from the outside world (e.g., API requests) is rigorously validated against a schema using `zod` before it enters the application layer.

## Project Structure

The project follows a Clean Architecture-inspired structure, adapted from the `skutopia-api` template:

```
/
├── src/
│   ├── app.ts                      # Express app setup
│   ├── container.ts                # Dependency Injection container (tsyringe)
│   ├── contracts/                  # Zod schemas and DTOs
│   ├── domain/                     # The pure, functional core of the application
│   ├── http/                       # Express controllers, routes, and middleware
│   ├── providers/                  # Concrete infrastructure (e.g., repositories)
│   ├── repositories/               # Repository interfaces (abstractions)
│   ├── services/                   # Application services (use cases)
│   └── utils/                      # Shared utilities, like our Result type
├── tests/                          # Unit and integration tests
├── package.json
├── tsconfig.json
└── README.md
```

## Technology Stack

-   **Language:** TypeScript
-   **Web Framework:** Express.js
-   **Validation:** `zod`
-   **Dependency Injection:** `tsyringe`
-   **Testing:** Jest & `ts-jest`

## Getting Started

### Prerequisites

-   Node.js (v16 or later)
-   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd fDDD
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:

```bash
npm run start:dev
```

The server will start on `http://localhost:3000`.

### Running Tests

To run the unit and integration tests, run:

```bash
npm test
```

## API Usage

To create a reservation, send a `POST` request to `/api/reservations`.

**Endpoint:** `POST /api/reservations`

**Request Body:**

```json
{
  "restaurantId": "1055c543-5589-446c-9390-3a9c6f85a3a2",
  "userId": "a7a8f8e2-c3b4-4e5f-8a9a-1b2c3d4e5f6a",
  "date": "2025-12-01T19:00:00.000Z",
  "partySize": 4
}
```

**Responses:**

-   **201 Created:** If the reservation is successful.
-   **400 Bad Request:** If the request body is invalid (e.g., missing fields, invalid date, party size is not a positive integer) or if the reservation is in the past.
-   **409 Conflict:** If the reservation cannot be made due to a business rule violation (e.g., restaurant is at full capacity).
-   **500 Internal Server Error:** For any other unexpected errors.
