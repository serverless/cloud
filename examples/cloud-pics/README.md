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

This example shows how to add a Serverless Cloud API to a Next.js app.

The front-end uses Server-Side Rendering (SSR) and can be deployed to Vercel.

# Prerequisites

Install Vercel CLI and Serverless Cloud CLI as needed:

```bash
npm install -g vercel
npm install -g @serverless/cloud
```

# Development environment

Clone this repo, then install dependencies and start your dev sandbox:

```bash
cd api
npm install
npm run dev
```

The first time you do this, copy your sandbox URL into `.env.local` in the project root, for example:

```bash
# .env.local
NEXT_PUBLIC_CLOUD_URL=<your personal instance url>
```

In a separate terminal window, run the Next.js development server:

```bash
npm install
npm run dev
```

That will start the Next.js dev server on port 3000. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

# Deploy to production

First deploy your Cloud API:

```bash
cd api
npm run deploy
```

This will output your production URL, which you'll need after the next step.

Deploy the frontend to Vercel:

```bash
# in the project root
npm run deploy
```

The first time you deploy it will create a project but won't deploy because `NEXT_PUBLIC_CLOUD_URL` isn't defined.

Go to "Environment Variables" in your project settings in the Vercel dashboard and add `NEXT_PUBLIC_CLOUD_URL` with the production API URL from the previous step.

Re-run `npm run deploy` and the frontend should deploy successfully.

## Token secret

To secure your login tokens, create a parameter named `TOKEN_SECRET` and set it to a random value in the Cloud dashboard.
