variable "aws_region" {
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  default     = "tipspay-blockc"
}

variable "frontend_bucket_name" {
  type        = string
  default     = "tipspay-blockc-frontend"
}

variable "cloudfront_price_class" {
  type        = string
  default     = "PriceClass_100"
}

variable "ecs_instance_type" {
  type        = string
  default     = "t3.medium"
}

variable "ecs_desired_count" {
  type        = number
  default     = 1
}

