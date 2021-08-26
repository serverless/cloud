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
The Serverless Status Page
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

**Serverless Status** ⎯⎯⎯ The Serverless Status Page, powered by [Serverless Cloud](https://serverless.com/cloud). You can see a live demo [at this link](https://magical-package-m2777.cloud.serverless.com/).

To get started, make sure the Serverless Cloud CLI is installed...

```
npm i -g @serverless/cloud
```

Then, clone this repo, and navigate into the `src` directory...

```
git clone https://github.com/serverless/status.git
cd src
```

Next, start your Serverless Cloud experience with the `start` command...

```
cloud start
```

Finally, you'll need to set the `ADMIN_PASSWORD` param in the [Serverless Cloud Dashboard](https://cloud.serverless.com) to any strong value of your choice. This will be the password you'll use to access the admin page.

After activation in the CLI, you should see a url to your personal instance of the status page. Open this url in the browser to see the public status page. Visit the `/admin` page and enter the password you've chosen to access the admin page where you can add services, incidents and updates.
