# Java Spring Security API

:warning: This sample uses Spring 4 which is [EOL](https://github.com/spring-projects/spring-framework/wiki/Spring-Framework-Versions#supported-versions). See the [Spring Security 5 API Quickstart](https://auth0.com/docs/quickstart/backend/java-spring-security5) to learn how to use Auth0 to secure an API built using Spring Boot 2 and Spring Security 5. :warning:

This is a standalone Java application that demonstrates how to protect API endpoints using Auth0 and Spring Security.

## Features

- Spring Boot application with Auth0 integration
- JWT-based authentication for API endpoints
- Protected endpoints under `/api/*` path
- Configuration via properties file

## Prerequisites

- Java 17 or higher
- Maven

## Configuration

Edit the `src/main/resources/application.properties` file to configure your Auth0 domain and API audience:

```properties
# Auth0 Configuration
auth0.audience=YOUR_API_AUDIENCE
auth0.issuer=https://YOUR_AUTH0_DOMAIN/
```

Note: running terraform will override `application.properties` file

## Running the Application

```bash
mvn spring-boot:run
```

The application will start on port 8080 by default.

## API Endpoints

- `/api/public` - A public endpoint (requires authentication)
- `/api/private` - A private endpoint (requires authentication)

## Testing the API

To test the protected endpoints, you'll need to include a valid JWT access token in the Authorization header of your requests:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## Dependencies

- Spring Boot
- Spring Security
- Auth0 Spring Security API