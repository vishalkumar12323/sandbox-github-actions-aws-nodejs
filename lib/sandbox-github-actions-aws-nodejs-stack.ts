import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as dotenv from "dotenv";
import * as path from "path";

export class SandboxGithubActionsAwsNodejsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    dotenv.config();

    const lambdaFunction = new lambdaNodejs.NodejsFunction(this, "LambdaFunction", {
      runtime: lambda.Runtime.NODEJS_24_X,
      entry: path.join(__dirname, "../lambda/main.ts"),
      handler: "handler",
      environment: {
        VERSION: process.env.VERSION || "0.0"
      }
    });


    const lambdaFunctionURL = lambdaFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ["*"],
        allowedMethods: [lambda.HttpMethod.ALL],
        allowedHeaders: ["*"]
      }
    });

    new cdk.CfnOutput(this, "URL", {
      value: lambdaFunctionURL.url
    });
  }
};
