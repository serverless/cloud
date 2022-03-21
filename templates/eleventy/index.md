---
title: Home
layout: base
tags: page
order: 1
---

# 11ty with Serverless Cloud!

Read more about 11ty [here](https://www.11ty.dev/).
Here is [another](/about) static page.

Your API is available at `/api`. If you're running locally with `cloud dev`, there is a proxy to your personal cloud sandbox already enabled for you.

## Parameters at build time:

<ul>
{% for param, value in params %}

<li><strong>{{ param }}:</strong> {{ value }}</li>
{% endfor %}
</ul>

## Data at build time:

<ul>
{% for item in data %}

<li><strong>{{ item.value.name }}:</strong> {{ item.value.email }}</li>
{% endfor %}
</ul>

## Data fetched at load time:

<ul id="data">Loading...</ul>

<script>getUsers();</script>
