---
title: Serverless Cloud Concepts
menuText: Serverless Cloud Concepts
description: Learn about Serverless Cloud's concepts with interfaces Dashboard.
menuOrder: 1
parent: Quick Start
---

# Serverless Cloud Concepts

Serverless Cloud introduces a new way to develop applications against Cloud by collaborating with your colleagues. In this page, we'll briefly mention the concepts around Serverless Cloud.

## Apps and Instances

Serverless Cloud allows you to build **APPS** within your team's **ORGANIZATION**. You can create as many apps as you want for different use cases or applications. An app can have multiple instances and each **instance** is completely separate from all the other **instances** in an **app**, and even store their own copy of your data and blob storage. The first instance that you start to use immediately is your **developer sandbox** that syncs your changes to cloud as you code. There are also different type of instances like preview instances, test instances and stages. See [here](/cloud/docs/apps/apps-instances) for more information.

## Cloud CLI

The Serverless Cloud CLI is a command-line interface (CLI) that provides a simple, unified interface to Serverless Cloud. Note that our CLI requires Node.js v14 and higher. Check your node version by running `node -v` from your terminal. The Serverless Cloud CLI has several modes to optimize experience in different situations:

- **Interactive Mode** (a.k.a. Cloud Shell) allows developers to connect to their Developer Sandbox from their local IDE, auto sync code changes, stream logs, and run common commands to manage their development workflow. This also integrates with the frontend frameworks suh as React, Vue, SvelteKit and more natively. When used in conjunction with such frameworks, `deploy` and `share` commands are running the build scripts of frontend frameworks and deploys them as a bundle with Serverless Cloud. This mode is enabled when you type `cloud` from your terminal.
- **Standard Mode** allows developers to run specific commands to manage apps and workflows on Serverless Cloud. You should be logged in to CLI by running `cloud login` to use standard mode.
- **Headless Mode** is used to manage the CI/CD operations on Serverless Cloud with an Access Token received from Cloud Dashboard.

See [here](/cloud/docs/cli) for more information.

## Serverless APIs

Serverless Cloud lets developers to build cloud-native REST and GraphQL APIs. You can either take advantage of Serverless Cloud's native `api` interface or [bring your existing API](/cloud/docs/apps/frameworks) written in Express.js, Koa or another framework.

See [here](/cloud/docs/apps/api) for more information.

## Serverless Data

Serverless Data is a powerful, scaleable datastore that's built-in to Serverless Cloud. Every instance on Serverless Cloud has its isolated, completely independent copy of application data powered by Serverless Data. In order to use Serverless Data programmatically, `data` interface with `get`, `set`, and `remove` commands is used. You can use these comamnds to interact with application data in single-digit-ms response times.

You can also seed data to your **developer sandbox** from a seed file (data.json by default) as well as export and import data. See [here](/cloud/docs/apps/data) for more information.

## Serverless Storage 

Serverless Storage is an easy to use durable storage service for your Serverless Cloud applications. It can be used for storing any sort of binary data, and can be read back at any time. You can use `storage` interface with `read`, `write`, `move`, `copy`, and `exists` methods to interact with Storage component with no configuration, just from code. Putting files under `/public` folder to make the assets available in the closest proximity with your users thanks to automatically available global CDN. You can also serve any of your static assets by putting them under `/static` directory. See [here](/cloud/docs/apps/blob-storage) for more information. 

## Serverless Cloud Params/Secrets

Serverless Cloud lets you define parameters/secrets to inject on your application on runtime. Parameters can be defined on Serverless Cloud Dashboard for organization or app level and can be overriden for specific instance. For example; you can define your development `STRIPE_TOKEN` app-wide and override it with a production value for your `production` stage. You can use `params` interface to read params params programmatically from your application.

## Serverless Schedulers

Using `schedule` interface, you can define periodic tasks on Serverless Cloud. This is particularly useful when you have to run a batch job or make a periodic check. See [here](/cloud/docs/apps/schedule) for more information.

## Serverless Events 

Serverless Cloud allows developers to build asynchronous workflows just by writing code. You can react to changes in Serverless Data and Serverless Storage using methods `data.on` and `storage.on`. You can also emit and dispatch any events using the `events` interface of SDK with methods `publish` and `on`. You can build event-driven applicaitons, one-off-events, react to changes in data and files just by using these methods. All the necessary infrastructure will be spun off automatically. See [here](/cloud/docs/apps/events) for more information.

## Working with Frontend Frameworks 

Serverless Cloud allows developers to integrate scripts in to your app lifecycle, as well as built-in support and optimization for some popular frameworks such as Next.js, SvelteKit, astro.build, 11ty, React, and Vue. You can define custom scripts in package.json and run them with Cloud CLI. If you provide scripts for reserved script names such as `build`, and `dev`, frontend frameworks are built and deployed along with Serverless Cloud backends when `deploy` and `share` commands are run. 

## Serverless Cloud Dashboard

Serverless Cloud Dashboard lets developers manage their apps and instances, create/edit params, monitor apps, make their apps forkable, and manage their developer and organizational profiles.

## Limits

Serverless Cloud poses some limits to protect our system and provide great experience for all of our users. Several Serverless Cloud services enforce different limits that we'll provide below

### General Limits 

- You can define 10 instances in an org. Please [contact us](mailto:cloud@serverless.com) if you want to increase this limit.
- The total code size of the application can't exceed 500MB in developer sandbox. This limit is 128MB for permanent stages. 
- All your tests can run no longer than 5 minutes in test stages. 
- The total size of all parameters on every instance can't exceed 3KBs. 

### Serverless API Limits

- APIs provided by Serverless Cloud time out after 29 seconds. 
- A Serverless Cloud app can handle 2000 requests per second. Please [contact us](mailto:cloud@serverless.com) if you want to increase this limit.
- The payload for APIs created by Serverless Cloud can't exceed 6MB when encoded by base64. It's slightly less when the payload is not using base64 encoding. 


### Serverless Data Limits

- The size of one item can't exceed 400KBs.
- The size of the data returned by Serverless Data can't exceed 1000 records or 1MB. 
- You can't do batch operations for more than 25 records. 


### Serverless Storage Limits

- The total storage for a permanent stage can't exceed 1 GB. Please [contact us](mailto:cloud@serverless.com) if you want to increase this limit.
- During clone operations, you can only clone 128MB of storage. 

### Serverless Events Limits 

- The timeout limit for event handler functions is 5 minutes. 
- An event is retried for 14 days, if it fails during the process. 
- Serverless Cloud lets you emit events to be dispatched in the future. However, you can schedule at most 1 year after publishing. 



