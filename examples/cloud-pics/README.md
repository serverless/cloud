<br>
<br>
<br>
<br>
<br>
<br>
<br>
<p align="center">
⚡️
<br>
<br>
<b>cloud.serverless.com</b>
<br>
Cloud Pics
</p>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

**Cloud Pics**

Cloud Pics is an Instagram-inspired photo sharing application built on [Serverless ⚡️ Cloud](https://serverless.com/cloud/).

It demonstrates:

- How to build an API using the Serverless Cloud SDK
- Images resizing using Serverless Storage and storage events
- How to use Serverless Data to store image and user data
- Using Next.js with server-side rendering (SSR)

# Prerequisites

Install Serverless Cloud CLI if not already installed:

```bash
npm install -g @serverless/cloud
```

# Development environment

Clone this repo, then install dependencies and start your dev sandbox:

```bash
npm install
cloud
```

That will start the Next.js dev server on port 3000. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

# Deploy to production

Deploy to Serverless Cloud:

```bash
cloud deploy production
```

## Token secret

To secure your login tokens, create a parameter named `TOKEN_SECRET` and set it to a random value in the Cloud dashboard.
