## vercel
variable "vercel_api_token" {
  description = "API token with a business provider"
  type        = string
  sensitive   = true
}

## auth0
variable "auth0_domain" {
  description = "The domain of the Auth0 tenant"
  type        = string
}

variable "auth0_tf_client_id" {
  description = "The client ID for the Auth0 application"
  type        = string
}

variable "auth0_tf_client_secret" {
  description = "The client secret for the Auth0 application"
  type        = string
  sensitive   = true
}

variable "auth0_sample_username" {
  description = "The sample username"
  type        = string
  default     = "user@atko.email"
}

variable "auth0_sample_password" {
  description = "The sample password"
  type        = string
  sensitive   = true
}