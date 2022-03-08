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
Serverless Cloud Analytics Example
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

**Serverless Cloud Analytics** ⎯⎯⎯ powered by [Serverless Cloud](https://serverless.com/cloud). You can see a live demo [at this link](https://shiny-project-qx2as.cloud.serverless.com).

[![Deploy to Serverless Cloud](https://cloud.serverless.com/deploy.svg)](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Fanalytics)

To get started, clone this repo, and navigate into the `src` directory...

```
git clone https://github.com/serverless/cloud.git
cd cloud/examples/analytics
```

To get started, make sure the Serverless Cloud CLI is installed:

```
npm i -g @serverless/cloud
```

To build the front end:

```
cd frontend
npm i
npm run build
```

Start your Serverless Cloud experience with the `start` command...

```
npm start
```

The CLI will print your developer sandbox URL. Open this url in the browser to see the example.

## Adding tracking to a website

To add visit tracking to a site, add the analytics pixel to your site by adding the following html on pages you want to track:

```html
<img src="<CLOUD_URL>/pixel.gif" alt="analytics pixel" />
```

Replace `<CLOUD_URL>` with the URL of your instance.


