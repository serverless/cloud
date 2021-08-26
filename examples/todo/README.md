# Serverless Cloud Example Application

This application is a sample to-do app build powered by React, and yes Serverless Cloud! 
You now own a personal development instance on Serverless Cloud. Just play with the code and watch changes synced in seconds. 

## APIs

Note that several endpoints are already defined by using the `api` object in `index.js`. You can create new API routes or update the existing ones to see the effect. 
More information about APIs can be found [here](https://serverless.github.io/cloud/apps/api.html).
 
## Serverless Data

Serverless Data is super-fast(single-digit miliseconds response time) automatically scaleable datastore that is capable of storing simple K/V items, or massive collections of complex objects that can be queried on multiple dimensions, sorted, and paginated. 
You don't need to think about maintenance and capacity planning while Serverless Cloud automatically takes care of it backed by AWS DynamoDB Global Tables.
Serverless Data is just there as a part of runtime so you don't need to provide credentialls, connection strings etc. All you need to do is to write code to get, set, or remove data. Note that Serverless Data makes API calls in order to set and retrieve data, so any route/function that calls a Serverless Data method must use `async/await`. There's already a data in your sample application seeded from `data.json` file in this directory. 

You can import and export data to/from your personal development instance by typing `import` and `export` while you're in Cloud Shell or you can just directly type `cloud import` or `cloud export` without starting the Cloud Shell.

More information about Serverless Data can be found [here](https://serverless.github.io/cloud/apps/data.html).

## Schedules

Serverless Cloud lets you create scheduled tasks using either `.every()` or `.cron()` methods. In this way, you can build automation for periodic tasks like batch processing etc. 

More information about Schedules can be found [here](https://serverless.github.io/cloud/apps/schedule.html).

## Testing

Serverless Cloud has built-in support for automated unit and integration testing. See the tests written for the sample app under tests/integration folder. You can write tests based on [Jest testing framework](https://jestjs.io/){:target="_blank"}.
Just type `test` when you're in Cloud Shell or type `cloud test` from your terminal to run the tests on your personal development instance.

More information about testing can be found [here](https://serverless.github.io/cloud/apps/testing.html).


## CLI and Cloud Shell

Serverless Cloud provides a seamless CLI experience to manage the service you built on Serverless Cloud. You can type `cloud start` or `cloud` when you are in the root directory of a Serverless Cloud project. This will trigger the Cloud Shell where you can run commands to list/delete your instances and services, share/clone the instances, import/export data to/from your personal development instances. All the available cloud commands can be seen when you type `help` from Cloud Shell or `cloud help` from your terminal.

More information about the CLI can be found [here](https://serverless.github.io/cloud/cli.html).

## Development Workflows

Serverless Cloud provides you with the personal development environment that's accessible you and only you. The URL for it is NOT accessible unless you are in personal development mode. 
When you need to show your work to others or deploy applications so the rest of the world can see it, some handy commands from CLI will be helpful. 

* Type `share` from Cloud Shell when you need to share an instance that contains both code and data with your colleagues and continue working in your personal development environment freely.
* Type `deploy <stage>` when you need to deploy your code to a permanent stage and make it accessible to your CI tool or your users. 
* Type `clone <stage>` when you need to copy both code and data of an instance to your personal development data and reproduce a bug on a stage. 

More information about development workflows can be found [here](https://serverless.github.io/cloud/workflows.html).

## Feedback

Many parts of this are still experimental, so please keep that in mind when testing. Please log any issues and additional feedback can be sent to cloud@serverless.com.