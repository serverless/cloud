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
<b>go.serverless.com</b>
<br>
The Serverless URL Shortner
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

**Go Serverless** ⎯⎯⎯ The Serverless URL Shortner, powered by [Serverless Cloud](https://serverless.com/cloud). It supports both random and named short urls with your own custom `go.acme.com` domain.

[![Deploy to Serverless Cloud](https://cloud.serverless.com/deploy.svg)](https://cloud.serverless.com/start/clone?repoUrl=https%3A%2F%2Fgithub.com%2Fserverless%2Fcloud%2Ftree%2Fmain%2Fexamples%2Furl-shortener)


To get started, make sure the Serverless Cloud CLI is installed...

```
npm i -g @serverless/cloud
```

Then, clone this repo, navigate into the `src` directory, and install dependencies...

```
git clone https://github.com/serverless/go.git
cd api
npm install
```

Next, start your Serverless Cloud experience with the `start` command...

```
cloud start
```

Finally, you'll need to set the `ADMIN_PASSWORD` param in the [Serverless Cloud Dashboard](https://cloud.serverless.com) to any strong value of your choice. This will be the password you'll use to access the admin page.

After activation in the CLI, you should see a url to your developer sandbox of the url shortner. Open this url in the browser and enter the pasword you've chosen to access the admin page where you can shorten new urls and manage existing ones.
