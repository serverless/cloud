---
layout: default
title: Parameters
nav_order: 3
parent: Building Applications
last_modified_date: 2021-05-30
---

# Parameters

{: .no_toc }

Serverless Cloud supports parameters, which can store secrets that your application needs to function.

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Setting parameters

Parameters are configured via the dashboard. Parameters are first specified per service, and then overriden per instance.

## Reading parameters

```js
const { api, params } = require("@serverless/cloud");

// your params are available at params.KEY
api.get("/", (req, res) => {
  console.log(params.KEY);
});
```

Here are some params already available for your to read without having to set them yourself:

- `CLOUD_URL` - This is the url of the instance you're currently running.
