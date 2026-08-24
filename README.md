# Sandbox GitHub Actions AWS Node.js

An AWS CDK application that deploys a Node.js AWS Lambda function and exposes it through a public Lambda Function URL. The stack is written in TypeScript and can be deployed locally or through GitHub Actions.

## Architecture

- `SandboxGithubActionsAwsNodejsStack` creates a `NodejsFunction` from `lambda/main.ts`.
- The Lambda runtime is Node.js 24.x.
- A public Function URL is created with CORS enabled for all origins, methods, and headers.
- The stack outputs the deployed endpoint as `URL`.
- The Lambda response includes a greeting, the configured `VERSION`, a timestamp, and the Node.js version field currently returned by the handler.

## Prerequisites

- Node.js and npm
- AWS CLI configured with credentials that can deploy CDK resources
- AWS CDK CLI, available through the local `aws-cdk` dependency and `npx`

The CDK app is environment-agnostic by default, so the target account and region come from the active AWS CLI configuration unless the environment is explicitly set in `bin/sandbox-github-actions-aws-nodejs.ts`.

## Getting started

Install dependencies:

```bash
npm ci
```

Optionally create a `.env` file to set the version returned by the Lambda:

```dotenv
VERSION=1.0
```

The default version is `0.0` when `VERSION` is not set.

## Commands

Compile the TypeScript project:

```bash
npm run build
```

Run the Jest test suite:

```bash
npm test
```

Synthesize the CloudFormation template:

```bash
npx cdk synth
```

Deploy the stack:

```bash
npx cdk deploy
```

The deploy output includes the Function URL. Test it with:

```bash
curl https://YOUR_FUNCTION_ID.lambda-url.YOUR_REGION.on.aws/
```

The response is JSON similar to:

```json
{
	"msg": "Hello From AWS Lambda!",
	"version": "1.0",
	"node_version": 20,
	"timestamp": "2026-01-01T00:00:00.000Z"
}
```

## GitHub Actions deployment

`.github/workflows/deploy.yml` deploys automatically after a push to `main`. The workflow:

1. Installs dependencies with `npm ci`.
2. Uses the AWS CDK CLI to deploy without an approval prompt.
3. Targets `ap-south-1`.

Configure these repository secrets before using the workflow:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

For production workloads, prefer GitHub Actions OIDC with a narrowly scoped IAM role instead of long-lived access keys.

## Project structure

```text
bin/       CDK application entrypoint
lambda/    Lambda handler source
lib/       CDK stack definition
test/      Jest tests
```

## Cleanup

Remove the deployed resources when they are no longer needed:

```bash
npx cdk destroy
```

