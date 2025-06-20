# Backend Project

This project is a backend application built with Java and Spring Boot. The application provides RESTful API endpoints for managing customers and loans.

## Development Guidelines

- **OpenAPI Specification:** Development should consider the descriptions provided in the OpenAPI specification located in this directory.
- **Java Version:** Java 17 or higher is required.
- **Spring Boot Version:** Spring Boot 3 or higher is required.
- **Spring Data:** Spring Data must be used for data access.
- **Build Tool:** You can use either Maven or Gradle.
- **Database:** Any database can be used, but PostgreSQL is preferred.
- **Logging:** A logging system should be implemented.
- **Docker and Docker Compose:** Development should primarily use Docker and Docker Compose for both development and CI/CD environments.
- **Testing:** Unit and integration tests should be included, using tools like Testcontainers.
- **Authorization:** Implement an authentication and authorization mechanism to secure the API endpoints. This is required for the frontend login functionality.
