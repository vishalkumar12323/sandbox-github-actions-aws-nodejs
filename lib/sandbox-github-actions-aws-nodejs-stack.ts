import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda";

export class SandboxGithubActionsAwsNodejsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const lambdaFunction = new lambda.Function(this, "LambdaFunction", {
      runtime: lambda.Runtime.NODEJS_LATEST,
      code: lambda.Code.fromAsset("lambda"),
      handler: "main.handler"
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
