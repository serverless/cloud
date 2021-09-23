---
title: Services & Instances
menuText: Services & Instances
menuOrder: 1
parent: Building Applications
---

# Services & Instances

Serverless Cloud lets developers build in rapid iterations and aims to reduce the feedback loop both while working as a solo-developer or collaborating with colleagues. Developing services with several instances options accelerate the process towards production without sacrificing the processes around CI/CD and testing. 

## Services

Serverless Cloud allows you to build **SERVICES** within your team's **ORGANIZATION**. You can create as many services as you want for different use cases or applications.

## Using Instances

Serverless Cloud provides the preview build of each service via instances. A service can have multiple instances and each **instance** is completely separate from all the other **instances** in a **service**, and even store their own copy of the data. The environments within **instances** are identical, so you can ensure that your application will behave exactly the same across all of them.

While **instance** enviroments are identical, Serverless Cloud lets you classify instances to complement your workflow.

### Personal Instances

Every developer on your team gets a **Personal Instance** for every **SERVICE** they work on. Each **Personal Instance** is your own "personal development workspace" that automatically syncs and deploys changes from your local as you code. To enable this interactive development mode, type `cloud` into the CLI within your project directory. This will spin up your own personal instance on Cloud with your own data store. You'll be able to see the URL of your personal instance and detect the impact of changes you make. The logs for developer instance will start streaming instantly into your terminal to help you iterate quickly. Every change you make to your application, every static asset that you'll add under `/static` folder will be synced to your own personal instance under 5 seconds depending on the size of the change. 

Note that the URL for personal instances won't be accessible after the personal development mode is ended. For this reason, it's encouraged to deploy your app to a stage. 

### Stages (Permanent Instances)

When you're ready to show your work to the world, you can **deploy** your code to a **stage**. These are permanent instances like `prod`, `staging` and `dev`. If you want to publish your code to one of these instances, type `cloud deploy my-stage-name` into the CLI and your **CODE** will be published to `my-stage-name`.

### Previews (Ephemeral Instances)

If you want to get feedback on your application, but don't yet want to publish it to one of the permanent stages above, you can created **PREVIEWS** instead. Type `cloud share` into the CLI, and Serverless Cloud will create a **preview** that contains your **code AND data**. **Previews** are just like **stages**, except that previews will automatically expire when they are no longer being used.

### Test instances

When you run `cloud test`, Serverless Cloud spins up a new **Test Instance** to run your tests, then tears it down once your tests have finished. This lets you test your code without impacting other instances, and is used to run tests as part of your automated CI/CD process.



