<!--
title: Get Started
menuText: Get Started
firstChildMenuText: Quick Start
description: Here's the guide to get started with Serveless Cloud in seconds
menuOrder: 2
has_children: true
has_toc: false
-->

# Quick Start

We believe in boosting developer productivity more than anything and it literally takes around a minute to get up and running with a full-stack application running on your personal sandbox with Serverless Cloud. 

There are two different ways of getting started with Serverless Cloud and both end up with a development environment that streams the logs to your terminal while syncing front-end and backend changes takes less than 5 seconds. When you’re ready to share your world, it takes less than a minute to deploy your application to a fully scalable permanent stage that is performance-optimized. 

Here are the ways to get started with Serverless Cloud. These are: 

- [Start from CLI](#start-from-cli)
- [Start from Dashboard](#start-from-dashboard) 


<div class="video"><iframe width="560" height="315" src="https://www.youtube.com/embed/0lGNFFQt5No" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>

## Start from CLI

Serverless Cloud provides you with a rich set of templates that you can use to start developing against your personal sandbox. Just make sure you are navigated into an empty folder in your Terminal and you have [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm​​) installed. All you need to do is to run the following command to start with Serverless Cloud. 

```
npm init cloud
```

You’ll find yourself in Cloud Shell and you'll be prompted to login to Serverless Cloud (you can always log out by running `cloud logout` from your Terminal). Then, you’ll see the templates that you can use to build your next project with Serverless Cloud. You can either build a full-stack application powered by known frameworks such as React, Vue, SvelteKit, Next.js, 11ty and more or you can build a backend using our SDK. Either in JS or TS.  

<img width="444" alt="CLI_TemplateOptions" src="https://user-images.githubusercontent.com/85096820/159345543-32bc2922-ce45-40b7-a3b9-a895ad92c696.png">

After selecting your template, Serverless Cloud spins off your personal sandbox in less than 30 seconds. All your logs will be streamed into this CLI, all your changes will be synced to your personal sandbox almost immediately. Happy coding! 

## Start from Dashboard

After you sign up to [Serverless Cloud](https://cloud.serverless.com), you’ll be navigated to the template selection screen after naming your organization and providing some information about yourself. 

Here you can select one of our ready templates visually or you can import an existing Serverless Cloud project from Github. See some of the template projects you can import from Github: 

- [Sendgrid + Serverless Cloud to build mail automation easily](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Fsendgrid)
- [Serverless Cloud Slack Bot to save songs shared in a channel into a Spotify Playlist](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Fslack-playlister)
- [Image resizer built with Serverless Cloud](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Fimage-resizer)
- [An application that integrates Serverless Cloud with MongoDB Atlas](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Fmongodb)
- [A classical TODO app](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Ftodo)

You can see more example projects [here](https://github.com/serverless/cloud/tree/main/examples). 

After selecting one of the templates or importing one of the example projects, Serverless Cloud creates a new app on your behalf and prompts you to start building by cloning the code to your local. Just follow the instructions provided on Serverless Cloud Dashboard to clone to code to your local and instantiate Cloud Shell integrated with your personal sandbox. 

Note that this operation may fail with "npm install exited with code 1" error. In such cases, 

- Get into the directory named same as app by running `cd <appName>` 
- Run `npm i` to install dependencies yourself
- Type `cloud` to start working on your project. 


**Next:** [Serverless Cloud Concepts](/cloud/docs/get-started/concepts)
