variable "REGISTRY" {
  default = "ghcr.io"
}

variable "OWNER" {
  default = ""
}

variable "REPOSITORY_NAME" {
  default = ""
}

variable "TAG" {
  default = ""
}

variable "API_FQDN" {
  default = "api.example.com"
}

variable "OAUTH2_AUDIENCE" {
  default = "https://api.example.com"
}

variable "OAUTH2_CLIENT_ID" {
  default = "client-id"
}

variable "OAUTH2_ISSUER_FQDN" {
  default = "example.auth0.com"
}

group "default" {
  targets = ["database", "storage", "pubsub", "backend", "frontend", "traefik", "log-router"]
}

function "latest_tag_name" {
  params = [suffix]
  result = "${REGISTRY}/${OWNER}/${REPOSITORY_NAME}-${suffix}:latest"
}

function "build_tag_name" {
  params = [suffix, tag]
  result = "${REGISTRY}/${OWNER}/${REPOSITORY_NAME}-${suffix}:${replace(tag, "/", "-")}"
}

function "tags" {
  params = [suffix, tag]
  result = [
    latest_tag_name(suffix),
    notequal(tag, "") ? build_tag_name(suffix, tag) : ""
  ]
}

target "database" {
  context    = "database"
  dockerfile = "Dockerfile"
  tags       = tags("database", TAG)
}

target "storage" {
  context    = "storage"
  dockerfile = "Dockerfile"
  tags       = tags("storage", TAG)
}

target "pubsub" {
  context    = "pubsub"
  dockerfile = "Dockerfile"
  tags       = tags("pubsub", TAG)
}

target "backend" {
  context    = "backend"
  dockerfile = "Dockerfile.production"
  tags       = tags("backend", TAG)
}

target "frontend" {
  context    = "frontend"
  dockerfile = "Dockerfile.production"
  tags       = tags("frontend", TAG)
  args = {
    "VITE_API_BASE_URL"     = "https://${API_FQDN}"
    "VITE_OAUTH2_AUDIENCE"  = "${OAUTH2_AUDIENCE}"
    "VITE_OAUTH2_CLIENT_ID" = "${OAUTH2_CLIENT_ID}"
    "VITE_AUTH0_DOMAIN"     = "${OAUTH2_ISSUER_FQDN}"
  }
}

target "traefik" {
  context    = "traefik"
  dockerfile = "Dockerfile"
  tags       = tags("traefik", TAG)
}

target "log-router" {
  context    = "log-router"
  dockerfile = "Dockerfile"
  tags       = tags("log-router", TAG)
}
