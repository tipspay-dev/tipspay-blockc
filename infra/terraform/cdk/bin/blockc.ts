#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { TipspayBlockcStack } from "../lib/tipspay-blockc-stack";

const app = new cdk.App();

new TipspayBlockcStack(app, "TipspayBlockcStack", {
  env: {
    region: "us-east-1"
  }
});

