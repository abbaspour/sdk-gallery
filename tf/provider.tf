terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.15.0"
    }
    auth0 = {
      source  = "auth0/auth0"
      version = "~> 1.14.0"
    }
    local = {
      source  = "hashicorp/local"
      version = "2.5.2"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

provider "auth0" {
  domain        = var.auth0_domain
  client_id     = var.auth0_tf_client_id
  client_secret = var.auth0_tf_client_secret
  debug         = "true"
}