---
title: Automated Testing
menuText: Automated Testing
description: Learn how to use Serverless Cloud's built-in support for automated unit and integration testing.
menuOrder: 5
parent: Worklows
---

# Automated Testing

Serverless Cloud has built-in support for automated unit and integration testing.

Simply create your test files and run the `cloud test` command from the command line, or enter `test` in the Cloud shell.

Your tests are run on Cloud, using the <a href="https://jestjs.io/" target="_blank" >Jest testing framework</a>.

## Writing tests

Serverless Cloud uses <a href="https://jestjs.io/" target="_blank" >Jest</a> under the hood and you have access to all its features like matchers, mock functions, and setup/teardown.

As an example let's create a test for the to-do sample application. This is the code we'd like to test:

```js
// from index.js

/*
 * Create a route to GET our TODO items
 */
api.get("/todos", async (req, res) => {
  // Call our getTodos function with the status
  let result = await getTodos(req.query.status, req.query.meta ? true : {});

  // Return the results
  res.send({
    items: result.items,
  });
});
```

The test for this handler will do a few things. First, it will set up some test data to retrieve. Then it will simulate the GET request using the built-in `invoke()` method and check the response. Finally it will clean up the test data.

Create a file called `api.test.js` in the `tests` folder. Test files can either have a file name ending with `.test.js` or `.test.ts`, or by placing them in a folder named `__tests__`.

Use `beforeAll` and `afterAll` blocks to set up the test data and delete it after the test has finished:

```js
// api.test.js

beforeAll(async () => {
  await data.set("todo:123456", {
    id: "123456",
    name: "Something to do",
  });
});

afterAll(async () => {
  await data.remove("todo:123456");
});
```

Now we're ready to write our test which goes in a `test` block.

Using the built-in `invoke()` function we can invoke our API handler and check the result.

```js
test("should get all todos", async () => {
  const { body } = await api.get("/todos?status=all").invoke();

  expect(body).toEqual({
    items: [
      {
        id: "123456",
        name: "Something to do",
      },
    ],
  });
});
```

And that's it! You can use the same techniques to add more test cases, such as changing the `status=all` query string parameter, and testing other methods like `POST` and `DELETE`.

<a href="https://jestjs.io/docs/getting-started" target="_blank" >Getting Started Guide</a>
Check out Jest's <a href="https://jestjs.io/docs/getting-started" target="_blank" >Getting Started Guide</a> to learn more about writing tests with the Jest framework.

[Our to-do example application](https://github.com/serverless/cloud/tree/main/examples/default) also includes tests that you can use as a starting point.

## Running tests

You can run your tests in the Cloud shell or from the command line.

To run your tests in the Cloud shell, enter `test` at the prompt:

```
% cloud

✔ Connected to your instance of "smoke-todo-cjs".
✔ Enabled automatic file syncing and log streaming.
✔ Copied your sandbox url to your clipboard.
→ https://<instance-url>

› test
```

This will run your tests in your developer sandbox, and display the results when they finish.

Alternatively, you can run your tests directly from the command line using `cloud test`:

```
% cloud test
```

This will create a new test instance, run your tests, and then delete the instance. Using a test instance lets you test your code without impacting your developer sandbox data, and can be used in your automated CI/CD process. It's recommended to run `cloud test` command from terminal for the development workflows. Test command in Cloud Shell is useful when you're developing your tests.

In our To-Do example, when all tests pass the output will be:

```
✔ 5/5 tests passed (3.871s)

  tests/integration/api.test.js

    ✔ should post a todo
    ✔ should get todos
    ✔ should delete the todo
    ✔ should get no todos

  tests/integration/schedule.test.js

    ✔ deletes overdue items

›
```

Let's make a change and break the tests. In `api.test.js` change "Something to do" to "Something else" in the expectation and then save the file, and enter the `test` command again. We now see this test failure:

```
✖ 1/5 tests failed (3.984s)

  tests/integration/api.test.js

  ● should post a todo

    expect(received).toContainEqual(expected) // deep equality

    Expected value: {"id": "123", "name": "Something else"}
    Received array: [{"id": "123", "name": "Something to do"}]

       7 |   })
       8 |
    >  9 |   expect(body.items).toContainEqual({
         |                      ^
      10 |     id: '123',
      11 |     name: 'Something else'
      12 |   })

      at Object.<anonymous> (tests/integration/api.test.js:9:22)
```

Jest provides a detailed report including the reason the test failed and the code location, so you can make the fix and re-run the tests.

## Test options

The test command has some optional arguments:

```
test <regexPattern> --coverage --workers <n>
```

### `<regexPattern>`

*Default: match all files*

Lets you run only tests that match the regular expression. For example, to only run tests files with "api" in the filename:

```
test api
```

Use `/` to match sub-directories:

```
test integration/api
```

You may need to put quotes around more complex patterns that contain an asterisk:

```
test "api\..*"
```

### `--coverage`

*Default: off*

Generates test coverage data in the `coverage` folder. Coverage data is output in these formats: `text-summary`, `text`, `clover`, `lcov`, `json`.

### `--workers <n>`

*Default: 1*

Uses `<n>` workers to run your tests in parallel. This may speed up your tests if you have a lot of them and they are independent of each other.


## Test interfaces

Serverless Cloud's runtime provides interfaces that make it easy to invoke your event handlers in tests, and to seed data.

### API interfaces

The API interfaces invoke the handler for a given URL and HTTP method.

```js
api.<method>(url).invoke(requestBody, options = { headers })
```

Where `<method>` is the HTTP method you wish to invoke, in lower-case.

Parameters:

- url (string): URL to request
- requestBody (object): the body of the request
- options (object): additional options (optional)

Options:

- headers (object): headers to send with the request (optional)

Return value: `Promise<object>` with object properties:

- body: the response body
- status: the HTTP response status code

### Schedule interfaces

The schedule interfaces invoke the handler for a given schedule expression.

```js
schedule.every(expression).invoke();
schedule.cron(expression).invoke();
schedule.rate(expression).invoke();
```

Parameters:

- expression (string): the schedule expression of the handler you wish to invoke

Return value: `Promise`

> Note: if there is more than one handler for a given expression, only the first will be invoked. This will be addressed in a future release. For now we recommend only using a single handler for a given schedule.

### Data seed interface

The seed interface makes it easy to add data for testing:

```
data.seed(itemsOrPath, overwrite);
```

Parameters:

- itemsOrPath (array or string): an array of items, or path to a JSON data file
- overwrite (boolean, defaults to false): set to true to remove any existing data before loading the new items

Return value: `Promise`

When using a data file the path must be relative to the root of your project, not relative to the test file itself. For example if your test file is in `tests/mytest.test.js` and the data file is in `tests/data.json`, you would use:

```javascript
// in tests/mytest.test.js
beforeAll(async () => {
  await data.seed("tests/data.json");
});
```

> Tip: You can use the [`cloud export`](../cli.md#cloud-export-filename---overwrite-) command to create a data file to use in your tests.

## Unit tests vs integration tests

In the context of Serverless Cloud, a unit test is one where the code under test doesn't access any external services such as Serverless Data. An example is a test for a self-contained utility function, or a test that replaces all external dependencies with mocks.

Unit tests could in theory run in your local development environment instead of in your developer sandbox, but we recommend that you run all unit and integration tests using the `cloud test` command instead, to simplify your project.
