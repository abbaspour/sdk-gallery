resource "auth0_tenant" "tenant_config" {
  friendly_name = "SDK Gallery"
  flags {
    enable_client_connections = false
  }
}

data "auth0_resource_server" "api_v2" {
  identifier = "https://${var.auth0_domain}/api/v2/"
}

data "auth0_connection" "Username-Password-Authentication" {
  name = "Username-Password-Authentication"
}

resource "auth0_user" "sample-user" {
  connection_name = data.auth0_connection.Username-Password-Authentication.name
  email           = var.auth0_sample_username
  password        = var.auth0_sample_password
}