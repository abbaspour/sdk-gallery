resource "random_string" "hono-session-key" {
  length = 64
  special = false
}

resource "local_sensitive_file" "hono-rwa-dot-env" {
  filename = "${path.module}/../hono/hono-rwa/.env"
  content = <<EOF
AUTH0_DOMAIN=${var.hono_domain}
AUTH0_CLIENT_ID=${var.hono_client_id}
AUTH0_CLIENT_SECRET=${var.hono_client_secret}
BASE_URL=https://hono-rwa-myaccount.abbaspour.workers.dev
AUTH0_SESSION_ENCRYPTION_KEY=${random_string.hono-session-key.result}
EOF
}