# Java Spring Boot OAuth2 Resource Server

This is a standalone Java application that demonstrates how to protect API endpoints using Auth0 and Spring Boot's OAuth2 Resource Server.

## Features

- Spring Boot application with Auth0 integration
- JWT-based authentication for API endpoints using OAuth2 Resource Server
- Protected endpoints under `/api/*` path
- Configuration via properties file

## Prerequisites

- Java 17 or higher
- Maven

## Configuration

Edit the `src/main/resources/application.properties` file to configure your Auth0 domain and API audience:

```properties
# Auth0 Configuration
spring.security.oauth2.resourceserver.jwt.issuer-uri=https://YOUR_AUTH0_DOMAIN/
spring.security.oauth2.resourceserver.jwt.audience=YOUR_API_AUDIENCE
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
- `/api/data` - A data endpoint returning sample JSON (requires authentication)

## Testing the API

To test the protected endpoints, you'll need to include a valid JWT access token in the Authorization header of your requests:

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## Dependencies

- Spring Boot
- Spring Security
- Spring Boot OAuth2 Resource Server