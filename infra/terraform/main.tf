module "vpc" {
  source = "./vpc.tf"
}

module "ecr" {
  source = "./ecr.tf"
}

module "ecs" {
  source = "./ecs.tf"
}

module "s3" {
  source = "./s3.tf"
}

module "cloudfront" {
  source = "./cloudfront.tf"
}

module "managed_blockchain" {
  source = "./managed_blockchain.tf"
}

