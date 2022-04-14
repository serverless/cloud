---
title: Promoting Stages
menuText: Promoting Stages
description: Learn how to promote your application to other stages.
menuOrder: 6
parent: Worklows
---

# Promoting Stages

For many cases, there's a stage that mimics the production. Developers push their changes and then run manual GUI/end-to-end tests on it before pushing to production. In such cases, "promotion" is used to simply copying the code from the mimicing stage to production. Here's an example flow that shows how promoting between stages works on Serverless Cloud:

```
# Start your project from Cloud Shell
> cloud

# Edit your code locally and watch the changes automatically and quit Cloud Shell
> quit

# Run your tests before you push it to a permanent stage.
> cloud test

# Share your work with your colleagues by creating a preview instance that has the same code and data as your developer sandbox
> cloud share

# Manual tests are okay so we can let CI run its tasks and push the app to staging to run GUI tests
> cloud deploy staging

# GUI tests are okay. Let's promote the code to prod from staging
> cloud promote staging prod
```

## Promoting full-stack applications

Full-stack applications that have a build step are not re-built during promotion.

For example, in a Next.js app with statically generated pages, any references to environment variables, parameters, or data at build time will be
baked into your build, and will remain in the build when promoted to a different stage.
