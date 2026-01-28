resource "aws_managedblockchain_node" "eth_node" {
  network_id = "n-ethereum-mainnet"
  member_id  = "m-1234567890"

  node_configuration {
    instance_type = "bc.t3.large"
    availability_zone = "${var.aws_region}a"
  }
}

output "managed_blockchain_rpc" {
  value = "https://your-managed-blockchain-rpc-url"
}

