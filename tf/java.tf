## java-minimal-jetty

resource "auth0_client" "java-minimal" {
  name            = "java minimal"
  description     = "java minimal client"
  app_type        = "regular_web"
  oidc_conformant = true
  is_first_party  = true

  callbacks = [
    "http://localhost:8080/callback"
  ]

  allowed_logout_urls = [
    "http://localhost:8080/login"
  ]

  jwt_configuration {
    alg = "RS256"
  }
}

resource "auth0_connection_client" "java-minimal-connections" {
  client_id     = auth0_client.java-minimal.client_id
  connection_id = data.auth0_connection.Username-Password-Authentication.id
}

data "auth0_client" "java-minimal" {
  client_id = auth0_client.java-minimal.client_id
}

resource "local_sensitive_file" "java-minimal-web-xml" {
  filename = "${path.module}/../java/java-minimal-jetty/src/main/webapp/WEB-INF/web.xml"
  content = <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!-- Created by terraform -->
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1"
         metadata-complete="false">
    <context-param>
        <param-name>com.auth0.domain</param-name>
        <param-value>${var.auth0_domain}</param-value>
    </context-param>
    <context-param>
        <param-name>com.auth0.clientId</param-name>
        <param-value>${auth0_client.java-minimal.client_id}</param-value>
    </context-param>
    <context-param>
        <param-name>com.auth0.clientSecret</param-name>
        <param-value>${data.auth0_client.java-minimal.client_secret}</param-value>
    </context-param>
</web-app>

EOF
}

## java-spring-boot
resource "auth0_client" "java-spring-boot" {
  name            = "java spring boot"
  description     = "java spring boot client"
  app_type        = "regular_web"
  oidc_conformant = true
  is_first_party  = true

  callbacks = [
    "http://localhost:8080/login/oauth2/code/auth0"
  ]

  allowed_logout_urls = [
    "http://localhost:8080"
  ]

  jwt_configuration {
    alg = "RS256"
  }
}

resource "auth0_connection_client" "java-spring-boot-connections" {
  client_id     = auth0_client.java-spring-boot.client_id
  connection_id = data.auth0_connection.Username-Password-Authentication.id
}


data "auth0_client" "java-spring-boot" {
  client_id = auth0_client.java-spring-boot.client_id
}

resource "local_sensitive_file" "java-spring-boot-application-properties" {
  filename = "${path.module}/../java/java-spring-boot/src/main/resources/application.properties"
  content = <<EOF
# Created by terraform
# Auth0 Configuration
spring.security.oauth2.client.registration.auth0.client-id=${auth0_client.java-spring-boot.client_id}
spring.security.oauth2.client.registration.auth0.client-secret=${data.auth0_client.java-spring-boot.client_secret}
spring.security.oauth2.client.registration.auth0.scope=openid,profile,email
spring.security.oauth2.client.provider.auth0.issuer-uri=https://${var.auth0_domain}/

EOF
}
