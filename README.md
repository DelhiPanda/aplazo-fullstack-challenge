# Project Overview

This project is divided into two main sections: the backend and the frontend. The backend, built with Java and Spring Boot, should be developed first as the frontend relies on its RESTful API endpoints.

## [Backend](back/README.md)

The backend provides the following core features:

- **Customer Creation:** An endpoint to create new customers (requires authorization).
- **Customer Information Retrieval:** An endpoint to retrieve customer details.
- **Loan Creation:** An endpoint to create new loan records.
- **Loan Information Retrieval:** An endpoint to retrieve loan details.
- **OpenAPI Specification:** The OpenAPI specification for the backend is located in the `back` folder.

## [Frontend](front/README.md)

The frontend consumes the RESTful API endpoints provided by the backend. Please refer to the `front/README.md` for more details on the frontend setup and usage.

> Development of the test must be done in a branch named `feature/[candidate's first name]_[candidate's last name]` (if there are conflicts, add the second last name), for example: `feature/juan_perez`. Instead of making a pull request to the master branch, the candidate must provide access to their repository where the take-home test is hosted using a token.
