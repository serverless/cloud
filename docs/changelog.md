---
title: Changelog
menuText: Changelog
description: See what's new in Serverless Cloud as we build the most developer-friendly serverless app platform ever! 🚀
menuOrder: 9
---

# Serverless Cloud updates and changes

See what's new in Serverless Cloud as we build the most developer-friendly serverless app platform ever! 🚀

## June 2022

### Billing System Improvements

We've made a number of improvements to our billing system to make it easier to manage your account billing. For additional payment options, please contact us at cloud@serverless.com. 

## May 2022 

### Deployment Logs on Serverless Cloud Dashboard

You now have the ability to see the historical deployment logs of your stages in the Serverless Cloud Dashboard. Click the target stage on the Serverless Cloud Dashboard and navigate to the “Deployments” tab. You can review the full logs of successful and failed deployments. 
 
### Dashboard Improvements for easier app management

As more applications and instances were added, the Serverless Cloud Dashboard could become cluttered with all of your developer sandboxes, preview instances, and stages. Today, we unveiled a new structured view that provides a clearer delineation between the different types of instances. Additionally, you now have the ability to pin certain instances, such as your production instance, to the top of the list for easier access.

## April 2022 

### Full-stack support

Serverless Cloud now includes support for frontend frameworks such as React, Vue.js, Eleventy, SvelteKit, Astro.build, and Next.js, with more frameworks on the way. This enables developers to seamlessly integrate frontend and backend code into a completely unified developer experience, providing you with a lightning-fast feedback loop. The Serverless Cloud CLI now includes a new "dev mode" that runs your framework's local development server within the context of your app. This grants you remote access to the parameters, data, and storage of your personal sandbox. Furthermore, we automatically create a local proxy to your API endpoint that runs alongside the local development server, allowing you to interact with your live backend in real time. Incorporate a "cloud:dev" script into your package. json file that executes your framework's standard "dev" script, and you're done. When you run "share" or "deploy" from the CLI, Serverless Cloud will generate a production optimized version of your project. Include the build command for your framework in your package.json's "cloud:build" script and it will be executed whenever it is shared or deployed. See the below example for Next.js. 

```
"scripts": {
 "cloud:build": "next build",
 "cloud:dev": "next dev",
},
```

### Billing Updates and New Plans

Thousands of developers have used Serverless Cloud to create full-stack event-driven applications by just writing code. Our early users were extremely helpful in improving our runtime and platform. We already host many production apps for a variety of use cases, and today, we're making paid plans available to any team while still offering our generous free tier for hobbyists and single developers. More information about plans can be found on the pricing page. If you have any questions, please contact us at cloud@serverless.com.

### Sentry Integration

With metrics and log views for each instance, Serverless Cloud already helps you understand and troubleshoot potential issues with your apps. However, our friends at Sentry provided an official way to integrate their service with Serverless Cloud. All errors within your Serverless Cloud apps will be tracked, along with rich traces and log data provided by Sentry out of the box. Connect your Sentry account to Serverless Cloud using the integration guide! More observability integrations are on the way!

### Next.js ISR Support

ISR (Incremental Static Regeneration) allows developers to build static pages at *runtime* instead of build time. This enables the ability to update static pages without having to run full build, which also reduces normal build times. Developers can take advantage of ISR integrated with Serverless Storage on Serverless Cloud. See the full-blog post here. 

### Discord Server

For questions and discussions about Serverless Cloud, we have a dedicated channel (#serverless-cloud) on Serverless Community Slack. Because this Slack community is also used for Serverless Inc.'s other products, we decided to launch our Discord Server in order to build a community dedicated solely to Serverless Cloud. Join us here to socialize with other builders, to learn from the team, and to bring your questions and feedback!

## March 2022

### Atomic Counters and Batch Sets
Serverless Data now supports atomic counters using the `data.add()` method or the `{ $add: [value] } ` syntax for `set` operations. Atomic updates ensure that addition and subtraction operations are processed in order, giving users the ability to maintain the integrity of counters even if there are multiple simultaneous requests. We've also released support for batch `set` operations, allowing users to set up to 25 items at once. For more informaiton, visit our [documentation](https://www.serverless.com/cloud/docs/apps/data).

## February 2022

### Serverless Cloud Events

We've released Serverless Cloud Events, a new feature that lets developers easily build event-driven serverless applications. With Serverless Cloud Events, developers can publish and schedule custom events and process them asynchronously with automatic throttling and retries. Events let you do work "in the background" and allow you to decouple your application to make it more scalable and resilient to errors. Events can also be scheduled for up to 1 year "in the future" if you need to do the work at a later time. Visit our [documentation](https://www.serverless.com/cloud/docs/apps/events) to learn more.

## January 2022

### Storage Manager (`beta`)

We've released our new **Storage Manager** in the Serverless Cloud dashboard that lets you easily upload, organize, and manage your Serverless Storage files. The new Storage Manager supports multi-file uploads and downloads, plus the ability to move, copy, and delete files in bulk. You can also create folders, rename files, view private files via signed URLs, and access public files using your public url endpoint. The Storage Manager is available now to all your Serverless Cloud instances. 

<img width="1280" alt="Serverless Cloud Storage Manager" src="https://user-images.githubusercontent.com/2053544/149234957-879d6d53-7ba5-4aed-9c1d-a130f195e035.png">


## December 2021

### Data Manager (`beta`)

We've released our new **Data Manager** in the Serverless Cloud dashboard that lets you easily explore and manager your Serverless Data. You can query and visualize collections, add and edit items, remove items in bulk, and export data. The Data Manager is available now to all your Serverless Cloud instances. 

<img width="1280" alt="Serverless Cloud Data Manager" src="https://user-images.githubusercontent.com/2053544/146956197-58d83d06-1ae1-4e49-bc54-a8cd0bd34951.png">

### CDN Support

Serverless Cloud now serves all HTTP request via a global CDN. By default, all request are served with a `cache-control` header set to `max-age=0, must-revalidate`, but this can be overridden by your API to control caching of your API routes. The CDN also enables the ability to serve "public" Serverless Storage files using `/public` on your app's endpoint. Additional caching control support for static assets and storage files is coming soon.

### Serverless Storage

We're happy to announce Serverless Storage, an easy to use file service for your Serverless Cloud applications. Developers can upload, retrieve, list, and remove private and public files with [Serverless Storage](https://www.serverless.com/cloud/docs/apps/blob-storage) using the new `storage` interface from our SDK. We've also added a new `upload` method to our `api` interface, making it incredibly easy to [handle uploads](https://www.serverless.com/cloud/docs/apps/api#handling-uploads), as well as enhancements to `sendFile`, letting you easily [serve storage objects](https://www.serverless.com/cloud/docs/apps/api#serving-serverless-storage-files) from your APIs. Check out [the sample image resizer application](https://github.com/serverless/cloud/tree/main/examples/image-resizer) to see Serverless Storage in action! 

## November 2021

### Discover and Test APIs with Interact (`beta`)

We've released our new **Interact** feature that lets you discover and test your app's API endpoints right from the Serverless Cloud dashboard. Explore a list of API endpoints you defined, then add parameters, headers, and a post body to call the endpoint and examine the response body and returned headers. You can even use tabs to interact with multiple APIs at the same time. This feature is in beta, so please share your feedback with us.

<img width="1280" alt="Serverless Cloud Interact" src="https://user-images.githubusercontent.com/2053544/141191632-8be32a16-43f5-4c37-876c-34ea701252e2.png">

### Auto-updating CLI

The CLI is the tool that enables Serverless Cloud workflows, single-second code syncing, and access to typings within your local IDE. In order to have access to the latest features and fixes, we've released support for auto-updating in version 2.3.4. If you are currently using a previous version (run `cloud version` to check), then please update to the latest version by running `npm i -g @serverless/cloud@latest`. This should be the _last time_ you need to run a manual install, including for any projects that are using a local installation.

## October 2021

### New Starter Templates

Sample projects are great, but sometimes you just want some basic scaffolding to get your new app started. We've added several starter templates to the CLI experience when creating a new app from scratch. Start with just the right amount of boilerplate to kick off your JavaScript or TypeScript API, or launch a preconfigured Vue.js or React project with a Serverless Cloud API backend in just seconds. Type `cloud` in a new directory and select "Create new app" to give it a try.

### Serverless Cloud Public Preview 🚀

After nearly a year of work, our hyper-productive serverless app platform with single second deployments is now open to everyone! Serverless Cloud is now in Public Preview and is accepting new registrations. Please be sure to update to the latest version of our CLI, and check out our [announcement post](https://www.serverless.com/blog/introducing-serverless-cloud-public-preview) for more details.

Thank you to all of our early users for helping us get Serverless Cloud ready for this launch. We're only getting started, so please keep the feedback and ideas coming.

### Public Profiles and Forkable Apps

Serverless Cloud accounts now have public profile pages that allow you to feature apps built on Serverless Cloud. Apps are `private` by default, but can be set to `public`, allowing anyone to view the app description and link to the live production version. Developers can also set apps to `forkable`, which allows other developers outside of their organization to make a copy of their app and deploy it to their own account.

<img width="1280" alt="profile-screenshot" src="https://user-images.githubusercontent.com/2053544/137222925-13db27a7-af44-495b-8271-28c3e691aa84.png">

Forking an app also copies the `parameter` names, letting users customize the app with their own values.

<img width="1280" alt="forkable-screenshot" src="https://user-images.githubusercontent.com/2053544/137223039-3a043442-b1c4-4369-8911-464ce11e64ed.png">

## September 2021

### Bring Your Own Framework (BYOF) Support

You can now use your existing HTTP frameworks like Express.js or Connect with Serverless Cloud. Using our new `http` interface, we will support your framework's API routing capabilities while still allowing you to take advantage of our other features. Serverless Cloud provides our own [modern API framework](/cloud/docs/apps/api) that makes it easy to build and deploy cloud native APIs, but if you've already invested in another framework, you can now easily migrate that application to Serverless Cloud. Learn more about this feature in the [documentation](https://www.serverless.com/cloud/docs/apps/frameworks)

```javascript
// Import and initialize your framework
import express from "express"; // or any supported framework
const app = new express();

// Enable express body parsing middleware
app.use(express.json());

// Import the http interface and wrap your initialized app
import { http } from "@serverless/cloud";
http.use(app);

// Express yourself! 🎉
app.get("/", (req, res) => {
	... make api magic ...
})
```

### Lightning Fast Syncing!

Serverless Cloud gives you a personal developer instance which syncs your code changes automatically from your IDE as you develop your application. This typically took 5-10 seconds to sync these changes. We are excited to release a major perfomance improvement that reduces the sync time to less than 1 seconds for normal code changes. With this update, code changes are immediately synced and deployed to your personal developer instance before you can even switch to your browser to test them. This feature requires you to update your CLI to the latest version.

### CLI Update for Faster & Simpler Onboarding

We continue to work on the onboarding process to make it incredible fast and easy to get a project up and running with Serverless Cloud. This update introduces new features to let you select between different sample applications, as well as some style/usability updates to the CLI to enhance developer productivity. Just type `cloud` from your terminal to see the latest changes! This feature requires you to update your CLI to the latest version.

### Data Events

We are very excited to announce the release of **Data Events** to Serverless Cloud. With this new update, you’re able to listen for changes to Serverless Data items, and then perform tasks asynchronously on the changed data. This opens up more use cases and processing capabilities for Serverless Cloud, including Slackbots and other applications that require asynchronous processing. Read more about this update from the [documentation](https://www.serverless.com/cloud/docs/apps/data#reacting-to-changes).

### Custom Domains Support

When you need to share your work with the outside world, it’s probably best to do it with your own brand. With this new update, you’ll be able to assign a custom domain to stages and start serving your application on your domain. In order to take advantage of this update:

1. Visit the settings page for any stage from the dashboard.
2. Click “Add Domain” and type in your domain name.
3. Add the record appeared in your domain registrar to verify the domain name.

### Serverless Cloud Private Preview

We have been working for months to make Serverless Cloud available to more people, and today we are proud to announce our Private Preview Launch. The registration is open on the Serverless Cloud Dashboard but we’ll start putting newcomers on the waitlist when we run out of our limited seats. We have also made some improvements on our CLI, so don’t forget to update it to the latest version.

We’d like to thank all of our private beta users for helping us get Serverless Cloud ready to launch. Your continued feedback is much appreciated.

## August 2021

### TypeScript Support

We are happy to announce that you can now build your Serverless Cloud applications using Typescript. Change the entry point of the application to `index.ts` to enable TypeScript. More information can be found in our [documentation](https://www.serverless.com/cloud/docs/apps/typescript).

### CI/CD Integration

We are happy to announce that you can now add CI/CD automation to your Serverless Cloud workflows. Create an access key in the Serverless Cloud dashboard and add it as an environment variable name `SERVERLESS_ACCESS_KEY` in your CI/CD environment. See the GitHub Actions example from our [documentation](https://www.serverless.com/cloud/docs/workflows/cicd).

### Monitoring with Instance Level Metrics

For any customer facing application, it’s crucial to see the performance of your application by keeping track of the important metrics. We are happy to announce instance level metrics that provides information about the number of requests, errors, and duration with additional summary data. Visit the metrics page for your instance from the Serverless Cloud dashboard to track performance.

### Testing for Serverless Cloud Applications

We are excited to announce new built-in testing capabilities for Serverless Cloud. You’ll be able to write unit and integration tests by using a Jest-compatible testing framework. Serverless Cloud creates an isolated test instance when you type `cloud test`, seeds it with data you provide, runs your tests and tears down the test instance. You can now run your tests against real cloud environments with a single command. You can also run your tests against your developer sandbox by typing `test` command from Cloud Shell. Visit our [documentation](https://www.serverless.com/cloud/docs/workflows/testing) for more information.

### Set Timeouts for APIs and Schedules

We are happy to introduce the ability to set timeout values for APIs and scheduled tasks on Serverless Cloud. You can now set timeouts of up to 29 seconds for API routes and up to 5 minutes for scheduled tasks.

```javascript
// Set a timeout for an API route
api.get('/foo', { timeout: 5000 }, (req, res) => { ...do something ... });

// Set a timeout for a schedule task
schedule.every('1 hour', { timeout: 30000 }, (event) => { ...do something ... });
```

## July 2021

### Parameter/Secrets Support

You are now able to define app level parameters and read the values programmatically from your Serverless Cloud applications. When you change a parameter in the dashboard, all running instances are immediately updated with the new value. Parameters can also be overridden at the instance level to allow you to set different values for different instances. All the parameters are encrypted and stored securely by Serverless Cloud. Visit our [documentation](https://www.serverless.com/cloud/docs/apps/params) for more information.

### Introducing Serverless Cloud Dashboard

Early users of Serverless Cloud have been using our CLI to build applications and manage workflows. Today, we are super excited to bring user a dashboard available at [cloud.serverless.com](https://cloud.serverless.com).

You can take following actions on Serverless Cloud Dashboard:

- View apps, create new apps, delete existing apps.
- View instances of apps, edit the name of an instance, delete an instance, create a new instance.
- View the API routes and scheduled tasks for an instance.

We’ll continue to add new capabilities to the Serverless Cloud Dashboard. Stay tuned for upcoming updates!

## June 2021

### Introducing the “cloud” shell

Previously, our users have been using the `cloud init` command to create a Serverless Cloud project in a directory and then type the `cloud start` command to initiate their development session on their personal development instance.

Today, we are simplifying this process by introducing the `cloud` command that combines the functionality of `init` and `start` commands. This new command now activates the “Cloud Shell” that makes it easier to run commands on Serverless Cloud. This feature requires you to update your CLI to the latest version.

### Serverless Cloud Private Beta Launch

After working for months and making internal releases with our team, we are super excited to say “hello world!” and launch the private beta release of Serverless Cloud. Serverless Cloud lets you build scalable, highly-secure, pay-per-use applications, without needing a deep knowledge of cloud services. The goal of Serverless Cloud is to reduce development complexity by focusing on interpretation instead of configuration, and by automatically applying best practices to common use cases, removing the need for all the boilerplate and configuration, and allowing developers to do what they do best: build software.
