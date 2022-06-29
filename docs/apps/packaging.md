---
title: Packaging
menuText: Packaging
description: Control the contents of your deployed packages
menuOrder: 11
parent: Building Applications
---

# Packaging

When you deploy a stage instance, Serverless Cloud runs through the following steps to produce a deployment package:

1. Your source files are "synced" to your instance
1. The build step runs, which runs the `cloud:build` script if it exists
1. Dev dependencies are removed using `npm prune --production`
1. The build output files and static assets are zipped and deployed

If you are using binary dependencies or if your deployment package is too large, you can use the `.serverlessignore` and `.deployignore` files to control what is synced and deployed.

> See the [`.gitignore` man page](https://git-scm.com/docs/gitignore) to learn more about the pattern format used in `.serverlessignore` and `.deployignore`.

## Binary dependencies

Serverless Cloud's runtime is linux-based, so binary packages you install locally will not work if you are on a different platform like Mac or Windows. To work around this, you can add the package to `.serverlessignore` and then re-install it at build time.

For example, `esbuild` includes a platform-specific binary, so you must add it to `.serverlessignore`:

`.serverlessignore`:

```
node_modules/**/esbuild/**
node_modules/**/esbuild-*/**
```

To install the linux version at build time, you can add a `cloud:build` npm script to your `package.json` file:

```
"build": "<your build command>",
"cloud:build": "npm i --save-dev esbuild && npm run build"
```

Use `--save-dev` so it is removed during the prune step.

> Note: another way to deal with binary dependencies is to run `npm ci` in your build script, which will re-install all dependencies, but this will increase your build time.

## Optimizing package size

Your package size impacts cold-start times, so you should remove as many unnecessary files from your deployed package as possible.

To analyze and reduce your package size you can run `npm install`, `npm run cloud:build`, and `npm prune --production` in your local development environment, then use a tool like `du` to find unnecessary files and folders and add them to `.deployignore`.

# Examples

## Prisma

Prisma lets you install both the native and linux binaries, then you can ignore the native binaries at sync and deploy time.

`schema.prisma`:

```
generator client {
  provider = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
}
```

`.serverlessignore`:

```
node_modules/@prisma/engines/**
node_modules/prisma/libquery_engine-*
node_modules/.prisma/client/libquery_engine-*
!node_modules/.prisma/client/libquery_engine-rhel-*
```

`.deployignore`:

```
node_modules/@prisma/engines/**
node_modules/prisma/libquery_engine-*
node_modules/.prisma/client/libquery_engine-*
!node_modules/.prisma/client/libquery_engine-rhel-*
```

## esbuild

`esbuild` binaries need to be excluded at sync time and re-installed at build time.

`.serverlessignore`:

```
node_modules/**/esbuild/**
node_modules/**/esbuild-*/**
```

`package.json` scripts section:

```
"build": "<your build command>",
"cloud:build": "npm i --save-dev esbuild && npm run build"
```

# Default ignore list

By default the following patterns are ignored during sync:

- `node_modules/.bin`
- `.git`
- `node_modules/@serverless/cloud`
- `node_modules/fsevents`
- `node_modules/aws-sdk/**/*.d.ts`
- `node_modules/aws-sdk/**/_.examples.json`
- `node_modules/aws-sdk/**/_.md`
- `node_modules/aws-sdk/dist`
- `node_modules/aws-sdk/dist-tools`
- `node_modules/aws-sdk/scripts`
- `node_modules/.vite/`
- `node_modules/.prisma/client/libquery_engine-debian*`
- `coverage/`
- `.next`
- `.svelte-kit`
- `.cache`
- `.nuxt`
- `.output`

If you need to re-include any of these patterns, you can reverse the pattern in `.serverlessignore`. For example, to sync the `.output` directory to your instance you would use:

```
# .serverlessignore
# Re-include the `.output` folder
!.output
```
