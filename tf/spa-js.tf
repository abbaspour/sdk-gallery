locals {
  spa-js-minimal-worker-url = "https://minimal-spa-js.abbaspour.workers.dev"
}

resource "auth0_client" "spa-js-minimal" {
  name            = "spa-js minimal"
  description     = "auth0-spa-js minimal client"
  app_type        = "spa"
  oidc_conformant = true
  is_first_party  = true

  callbacks = [
    local.spa-js-minimal-worker-url,
    "http://localhost:3000/",
    "http://localhost:5173/",
    "http://localhost:8080/",
    "http://localhost:5500/"
  ]

  allowed_logout_urls = [
    local.spa-js-minimal-worker-url,
    "http://localhost:3000/",
    "http://localhost:5173/",
    "http://localhost:8080/",
    "http://localhost:5500/"
  ]

  web_origins = [
    local.spa-js-minimal-worker-url,
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:5500"
  ]

  jwt_configuration {
    alg = "RS256"
  }
}


resource "auth0_connection_client" "spa-js-minimal-connections" {
  client_id     = auth0_client.spa-js-minimal.client_id
  connection_id = data.auth0_connection.Username-Password-Authentication.id
}

# Generate local config file for the SPA
resource "local_file" "spa-js-minimal-auth-config" {
  filename = "${path.module}/../spa-js/minimal-spa-js/public/auth_config.json"
  file_permission = "0644"
  content  = jsonencode({
    domain   = var.auth0_domain
    clientId = auth0_client.spa-js-minimal.client_id
  })
}
