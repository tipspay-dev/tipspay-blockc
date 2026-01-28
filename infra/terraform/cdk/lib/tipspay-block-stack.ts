import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class TipspayBlockcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const projectName = "tipspay-blockc";

    // VPC
    const vpc = new ec2.Vpc(this, "BlockcVpc", {
      maxAzs: 2
    });

    // ECR (backend image)
    const backendRepo = new ecr.Repository(this, "BackendRepo", {
      repositoryName: `${projectName}-backend`
    });

    // ECS Cluster
    const cluster = new ecs.Cluster(this, "BlockcCluster", {
      vpc,
      clusterName: `${projectName}-cluster`
    });

    // Fargate Task Definition
    const taskDefinition = new ecs.FargateTaskDefinition(this, "BackendTask", {
      cpu: 512,
      memoryLimitMiB: 1024
    });

    taskDefinition.addContainer("BackendContainer", {
      image: ecs.ContainerImage.fromEcrRepository(backendRepo, "latest"),
      portMappings: [{ containerPort: 4000 }]
    });

    // Fargate Service (public)
    new ecs.FargateService(this, "BackendService", {
      cluster,
      taskDefinition,
      desiredCount: 1,
      assignPublicIp: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC }
    });

    // S3 (frontend hosting)
    const frontendBucket = new s3.Bucket(this, "FrontendBucket", {
      bucketName: `${projectName}-frontend`,
      publicReadAccess: true,
      websiteIndexDocument: "index.html"
    });

    // CloudFront (S3 origin)
    const distribution = new cloudfront.Distribution(this, "FrontendDistribution", {
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(frontendBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      defaultRootObject: "index.html"
    });

    new cdk.CfnOutput(this, "FrontendBucketName", {
      value: frontendBucket.bucketName
    });

    new cdk.CfnOutput(this, "CloudFrontDomain", {
      value: distribution.domainName
    });

    new cdk.CfnOutput(this, "EcrRepositoryUrl", {
      value: backendRepo.repositoryUri
    });

    new cdk.CfnOutput(this, "ClusterName", {
      value: cluster.clusterName
    });
  }
}

