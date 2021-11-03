---
title: Serverless Storage
menuText: Serverless Storage
description: Serverless Storage is a low profile, easy to use, file service that allows for file system like applications in a serverless environment.
menuOrder: 5
parent: Building Applications
---

# Serverless Storage

Serverless Storage is a low profile, easy to use, file service that allows for file system like applications in a serverless environment. It can be used for storing any sort of binary data, and can be read back at anytime. 

# Using Serverless Storage

Access to Serverless Storage is automatically included in the runtime environment, just import the `storage` helper from `@serverless/cloud`. Note, all storage operations are asyncronous, so async/await or `.then` is required for their use.

```javascript
// Require the data helper - CommonJS
const { storage } = require("@serverless/cloud")

// ES Modules
import { storage } from "@serverless/cloud"
```

## Storing Files

Files can be stored just by passing the binary string to the `write` function. This could either be files uploaded via an HTTP request, or modifying any existing files and saving the changes. Note that if a file exists at the provided path, it will be replaced with the new file.

You can optionally not pass a path for the file, which will save it at the "root" directory.

Metadata can also be passed to be saved alongside your file.

```javascript
await storage.write(binaryData, 'your/path/binaryData.ext')
await storage.write(binaryData, 'your/path/binaryData.ext', { isThisAFile: true })

// This goes to root
await storage.write(binaryData)
```

## Reading Files

Files can be read into memory as either a ReadableStream or a Buffer. If no options are passed, a ReadableStream is returned by default.
Also included is `readBuffer` for ease of use, if you want to only use buffers without any extra arguments. To read the file, the absolute directory must be passed. If the file does not exist, `undefined` is returned.  

```javascript
const stream = await storage.read('binaryData.ext')

const buffer = await storage.read('binaryData.ext', { buffer: true })
const buffer = await storage.readBuffer('your/path/binaryData.ext')
```

## Copying and Moving Files

Files can be moved or copied to any directory within storage. If a destination directory does not exist, it will be created.

```javascript
await storage.move('binaryData.ext', 'bin')
// binaryData is now located at bin/binaryData.ext

await storage.copy('bin/binaryData.ext', 'bin-copy')
// binaryData is now located at both bin/binaryData.ext and bin-copy/binaryData.ext
```

## Checking File Existance

To avoid a read operation, you may want to just check if a file exists before going forward. 

```javascript
const exists = await storage.exists('bin/binaryData.ext')

const doesNotExist = await storage.exists('not-real/binaryData.ext')
```

## File Information and Metadata

You can retrieve when a file was last modified, size, content type, and any saved metadata using `stat`

```javascript
const { lastModified, size, metadata, type } = await storage.stat('your/path/binaryData.ext')
```

## Listing Files

Files can be listed either as a whole or per directory.

```javascript
const list = await storage.list('bin')
// ['bin/binaryData.ext']

const fullList = await storage.list()
// ['bin/binaryData.ext', 'bin-copy/binaryData.ext']
```

## Cloud Integrations with Storage

Storage can be used in tandem with other Cloud services, such as the API and Data helpers. 

- [API](/cloud/docs/apps/api)
- [Data](/cloud/docs/apps/data)