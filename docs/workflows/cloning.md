---
title: Cloning Instances
menuText: Cloning Instances
menuOrder: 4
parent: Worklows
---

# Cloning Instances

Another powerful feature of Serverless Cloud is its "forking" capabilities. Developer Instances are just versatile working copies that can be used for developing, testing, debugging, and more. If you have an existing **git workflow**, you can load the current version of your code from your git repository. However, you can also **clone** an existing instance to give you a starting point. Type `cloud clone my-stage-name` into the CLI and it will copy both the **code AND data** from the `my-stage-name` instance into your Developer Instance as well as update your local working directory. This allows you to quickly begin working with the current version of the code.

```
# An error is occuring at staging but you can't reproduce it on your personal instance. 
# Clone staging with both code and data. 
> cloud clone staging


# Start your personal instance replicating the exact environment with staging
> cloud

# After fixing the issue, make your colleagues verify that it's solved on a preview instance
> share 

# Push your changes to staging back again or let CI handle it for you
> cloud test
> cloud deploy staging
```
