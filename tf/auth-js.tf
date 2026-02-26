resource "auth0_client" "express-server-js-minimal" {
  name            = "express-server-js-minimal"
  description     = "express-server-js-minimal client"
  app_type        = "regular_web"
  oidc_conformant = true
  is_first_party  = true

  callbacks = [
    "http://localhost:3000/auth/callback",
    "http://local.abbaspour.net:4000/auth/callback"
  ]

  allowed_logout_urls = [
    "http://localhost:3000"
  ]

  jwt_configuration {
    alg = "RS256"
  }
}

resource "auth0_connection_client" "express-server-js-minimal-connections" {
  client_id     = auth0_client.express-server-js-minimal.client_id
  connection_id = data.auth0_connection.Username-Password-Authentication.id
}

data "auth0_client" "express-server-js-minimal" {
  client_id = auth0_client.express-server-js-minimal.client_id
}

resource "random_string" "express-server-js_session_secret" {
  length           = 32
}

resource "local_sensitive_file" "express-server-js-minimal-env-local" {
  filename = "${path.module}/../auth-js/express-server-js-minimal/.env"
  content = <<EOF
# Created by terraform
AUTH0_DOMAIN=${var.auth0_domain}
AUTH0_CLIENT_ID=${auth0_client.express-server-js-minimal.client_id}
AUTH0_CLIENT_SECRET=${data.auth0_client.express-server-js-minimal.client_secret}
AUTH0_SESSION_SECRET=${random_string.express-server-js_session_secret.result}
APP_BASE_URL=http://localhost:3000/
#APP_BASE_URL=http://local.abbaspour.net:4000/auth/callback
EOF
}

