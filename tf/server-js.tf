resource "auth0_client" "server-js-cf-worker" {
  name            = "server-js-cf-worker"
  description     = "server-js-cf-worker client"
  app_type        = "regular_web"
  oidc_conformant = true
  is_first_party  = true

  callbacks = [
    "https://example-cf-worker-web.abbaspour.workers.dev/callback",
    "https://cf-worker-hono-auth0.abbaspour.workers.dev/callback",
    "http://localhost:8787/callback"
  ]

  allowed_logout_urls = [
    "https://example-cf-worker-web.abbaspour.workers.dev/",
    "http://localhost:8787"
  ]

  jwt_configuration {
    alg = "RS256"
  }
}

resource "auth0_connection_client" "server-js-cf-worker-connections" {
  client_id     = auth0_client.server-js-cf-worker.client_id
  connection_id = data.auth0_connection.Username-Password-Authentication.id
}

data "auth0_client" "server-js-cf-worker" {
  client_id = auth0_client.server-js-cf-worker.client_id
}

resource "random_string" "auth0_client_secret" {
  length           = 32
}

resource "random_string" "auth0_session_secret" {
  length           = 32
}

resource "local_sensitive_file" "server-js-cf-worker-env-local" {
  filename = "/Users/amin/project/auth0/auth0-server-js/examples/example-cf-worker-web/.dev.vars"
  content = <<EOF
# Created by terraform
AUTH0_DOMAIN=${var.auth0_domain}
AUTH0_CLIENT_ID=${auth0_client.server-js-cf-worker.client_id}
AUTH0_CLIENT_SECRET=${data.auth0_client.server-js-cf-worker.client_secret}
AUTH0_SESSION_SECRET=${random_string.auth0_session_secret.result}
APP_BASE_URL=https://example-cf-worker-web.abbaspour.workers.dev/
EOF
}

