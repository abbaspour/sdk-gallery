resource "auth0_client" "nextjs-minimal" {
  name            = "next.js minimal"
  description     = "next.js minimal client"
  app_type        = "regular_web"
  oidc_conformant = true
  is_first_party  = true

  callbacks = [
    "http://localhost:3000/auth/callback"
  ]

  allowed_logout_urls = [
    "http://localhost:3000/"
  ]

  jwt_configuration {
    alg = "RS256"
  }
}

resource "auth0_connection_client" "nextjs-minimal-connections" {
  client_id     = auth0_client.nextjs-minimal.client_id
  connection_id = data.auth0_connection.Username-Password-Authentication.id
}

data "auth0_client" "nextjs-minimal" {
  client_id = auth0_client.nextjs-minimal.client_id
}

resource "random_string" "auth0_secret" {
  length           = 32
}

resource "local_sensitive_file" "nextjs-minimal-env-local" {
  filename = "${path.module}/../next.js/minimal/.env.local"
  content = <<EOF
# Created by terraform
AUTH0_DOMAIN=${var.auth0_domain}
AUTH0_CLIENT_ID=${auth0_client.nextjs-minimal.client_id}
AUTH0_CLIENT_SECRET=${data.auth0_client.nextjs-minimal.client_secret}
AUTH0_SECRET=${random_string.auth0_secret.result}"
APP_BASE_URL=http://localhost:3000
EOF
}

/*
data "vercel_prebuilt_project" "nextjs-minimal" {
  path = "../next.js/minimal/"
}

resource "vercel_project" "nextjs-minimal" {
  name      = "gallery-nextjs-minimal"
  framework = "nextjs"
}

resource "vercel_project_environment_variables" "nextjs-minimal-env-vars" {
  project_id = vercel_project.nextjs-minimal.id
  variables = [
    {
      key   = "AUTH0_DOMAIN"
      value = var.auth0_domain
      target = ["production", "preview"]
    },
    {
      key   = "AUTH0_CLIENT_ID"
      value = auth0_client.nextjs-minimal.client_id
      target = ["production", "preview"]
    },
    {
      key       = "AUTH0_CLIENT_SECRET"
      value     = data.auth0_client.nextjs-minimal.client_secret
      target = ["production", "preview"]
      sensitive = true
    }
  ]
}
*/