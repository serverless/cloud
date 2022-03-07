---
title: Serverless Data
menuText: Serverless Data
description: Serverless Data is a super fast, automatically scalable datastore that's built in to Serverless Cloud.
menuOrder: 4
parent: Building Applications
---

# Serverless Data

Serverless Data is a super fast, automatically scalable datastore that's built in to Serverless Cloud. It's capable of storing simple K/V items, or massive collections of complex objects that can be queried on multiple dimensions, sorted, and paginated. With single-digit millisecond response times, it provides enough power to cover your most common needs and use cases.

With Serverless Data, **your data is just there** as part of your application's runtime. No connection strings, credentials, capacity planning, or database maintenance. You can use the Serverless Cloud `data` to `get`, `set`, and `remove` data whenever you need access to state. Plus, Serverless Data is isolated to each **INSTANCE**, giving every developer, stage, and preview build of an **APP** a completely independent copy of your application's data.

## Using Serverless Data

Access to Serverless Data is automatically included in your runtime environment. It provides a simple interface for persisting and retrieving state. By default, Serverless Data is available through the `data` variable as defined by the `require` statement at the top of the `index.js` file. Serverless Data makes API calls in order to set and retrieve data, so any route/function that calls a Serverless Data method must use `async/await`.

```javascript
// Require the data interface - CommonJS
const { data } = require("@serverless/cloud");

// ES Modules
import { data } from "@serverless/cloud";

// Set and get data
await data.set("foo", "bar");
let results = await data.get("foo");
```

## Setting Items

Setting data with Serverless Data can be accomplished using the `set` method. You provide a **key** as the first argument and a **value** (either a string, boolean, number, array, or object) as the second parameter. Keys are case sensitive and can be `string`s up to 256 bytes each and can contain any valid utf8 character including spaces. By default, the `set` command will return the updated item.

```javascript
await data.set("foo", "bar");
await data.set("fooNum", 123456);
await data.set("foo-Bool", true);
await data.set("foo_Array", ["val1", "val2", "val3"]);
await data.set("foo Obj", { key1: "some val", key2: "some other val" });
```

**Note:** Leading and trailing spaces are automatically removed from key names, so both `'keyName'` and `' keyName '` would be equivalent.

An options object can be passed as third argument. The following options are supported:

| Option Name                            | Type                         | Description                                                                                                                                                                                                                         |
| -------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| meta                                   | `boolean`                    | Returns a JSON object that contains the item meta data. The value of the item is returned in a `value` field.                                                                                                                       |
| overwrite                              | `boolean`                    | Overwrites the current key including its meta data.                                                                                                                                                                                 |
| ttl                                    | `integer` or `ISO 8601 date` | Sets a Time-to-Live on the item. If an integer is provided that is greater than the current epoch in seconds, that is used. Any other integer will be added to the current epoch. A full or partial ISO 8601 date can also be used. |
| label1, label2, label3, label4, label5 | `string`                     | Additional keys that can be used to reference the item. Five labels are available and like item `key`s, can use collection namespaces.                                                                                              |

```javascript
await data.set("foo", "bar", {
  meta: true,
  overwrite: true,
  ttl: 3600,
  label1: "baz",
  label2: "baz:bat",
});
```

## Using collection namespaces

Keys can be prefixed with a collection namespace. This allows you to group multiple items together and access them as a collection (in whole or in part) instead of needing to `get` each item separately.

Collection namespaces must use a colon (`:`) separator between the namespace and the key name. Collection names are case sensitive, can be `string`s up to 256 bytes, and can contain any valid utf8 character including spaces.

When using collection namespaces, key names have the following exceptions:

- `|` and `*` characters CANNOT be used anywhere in the key name
- Key names CANNOT start with `>` or `<` characters

```javascript
✅ await data.set('my-namespace:bat', 'some value');
✅ await data.set('my-namespace:baz', { foo: 'bar' });
✅ await data.set('My Collection Name:Some Key Name', 'some other value');
✅ await data.set(`collection~!@#$%^&*()_+:key-=[]{}:key";'<>?,./`, 'another value');
✅ await data.set(`>simple|key*`, 'simple keys have no character restrictions');
❌ await data.set('some-collection:key with a | in it', 'foobar');
❌ await data.set('some-collection:key with a * in it', 'foobar');
❌ await data.set('some-collection:>some-key', `oops, can't start with a > or <`);
```

The namespace becomes part of the item's key, so you must use the full key name (including the namespace) to retrieve that item.

**Note:** Leading and trailing spaces are automatically removed from collection namespaces and key names, so both `'foo:bar'` and `' foo : bar '` would be equivalent.

## Getting Items

Items can be retrieved using the `get` method. This method takes the **key** as the first argument, and an optional **options** object as the second argument. By default, the `get` method will return the value stored in the item.

```javascript
let result = await data.get("foo");

// With a collection namespace
let result = await data.get("my-namespace:bat");
```

In addition to retrieving a single key, you can also retrieve items in a collection by providing the collection name with a colon and a `*` as a wildcard.

```javascript
let results = await data.get("my-namespace:*");
```

This will return an `items` array with all keys in the namespaced collection. By default, the items will be limited to 100 and the keys will be sorted in ascending lexiconigraphical order. These defaults can be changed by providing an options object as the second argument.

The following options are supported:

| Option Name | Type                           | Description                                                                                                      |
| ----------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| meta        | `boolean`                      | Returns a JSON object that contains the item meta data. The value of the item is returned in a `value` field.    |
| limit       | `integer`                      | Limits the number of items returned from a collection. Defaults to `100`.                                        |
| reverse     | `boolean`                      | Reverses the sort order of keys returned from a collection. Defaults to `false`.                                 |
| start       | `string`                       | A key (including namespace) to start retrieving items from. Used for pagination.                                 |
| label       | `enum` (`label1`, ...`label5`) | Access items by their `label` instead of their `key`. Items requests via a label always return an `items` array. |

```javascript
let results = await data.get("my-namespace:*", { limit: 10, reverse: true });
```

If the only option you need to pass is `{ meta: true }`, you can simply pass `true` as the second argument to the `get` method.

```javascript
let results = await data.get("foo", true);
let results = await data.get("my-namespace:bat", true);
let results = await data.get("my-namespace:*", true);
```

### Response formats

Serverless Data either returns a single item or an array of multiple items. Any `data.get()` request that specifies an exact key match (e.g. `data.get('foo')` or `data.get('foo:bar')`) will return a single item. Any request that could return more than one item will return an object with an `items` array that contains `key`s and `value`s:

```javascript
{
  items: [
    { key: "foo:bar", value: "item1" },
    { key: "foo:bat", value: { some: "value" } },
    { key: "foo:baz", value: 1234 },
  ];
}
```

Any non-exact match request will return items in the array format. This includes the use of any [conditionals](#using-conditionals-to-query-items-in-a-collection), getting items [using a label](#getting-items-by-their-labels), or getting [multiple items by their keys](#getting-items-by-their-labels).

### Pagination

The total number of items returned by a single `data.get()` call is limited to the value specified by the `limit` parameter (default 100). If additional items are available, a `lastKey` will be returned. This value can be passed into a subsequent call to `data.get()` as the `start` parameter. A `.next()` convenience function will also be returned which can be called directly instead of constructing the additional call.

```javascript
const result = await data.get('foo:*', { limit: 3 });

// result:
{
  items: [
    { key: "foo:bar", value: "item1" },
    { key: "foo:bat", value: true" },
    { key: "foo:baz", value: 1234 },
  ],
  lastKey: "foo:baz",
  next: [Function: next]
}

const nextResult = await data.get('foo:*', { limit: 3, start: "foo:baz" });
```

To paginate through all items using `next()`:

```javascript
let result = await data.get("foo:*", { limit: 3 });

while (result) {
  // do something with result.items
  result = result.next ? await result.next() : null;
}
```

## Using conditionals to query items in a collection

Collections give you super powers, allowing you to limit the items returned based on conditional operators.

### Partial matches

You've already seen the `*` wildcard used to retrieve _all_ items from a collection, but you can also use the wildcard to retrieve items with partially matching keys as well. **Note:** Wildcards are only supported at the end of a key expression.

```javascript
// Retrieve all keys from the `user123` collection
let results = await data.get("user123:*");

// Retrieve all keys from the `user123` collection that start with 'orders'
let results = await data.get("user123:orders*", true);
```

### Greater than and Less than

Keys in collections are sorted in lexiconigraphical order, so you can retrieve all items from a collection that are greater than, greater than or equal to, less than, or less than or equal to a supplied key. Use the standard symbols (`>`, `>=`, `<`, `<=`) after the collection name and colon to filter the return items.

```javascript
// Retrieve all keys from the `user123` collection greater than 2021-05-18
let results = await data.get("user123:>2021-05-18");

// Retrieve all keys from the `user123` collection greater than or equal to 2021-05-18
let results = await data.get("user123:>=2021-05-18");

// Retrieve all keys from the `user123` collection less than 2021-05-18
let results = await data.get("user123:<2021-05-18");

// Retrieve all keys from the `user123` collection less than or equal to 2021-05-18
let results = await data.get("user123:<=2021-05-18");
```

### Retrieving items between two keys

If you want to retrieve items that are lexiconigraphically between two keys, specify the two partial keys between a `|`.

```javascript
// Retrieve all keys between 2021-05-01 and 2021-05-31
let results = await data.get("user123:2021-05-01|2021-05-31");
```

## Getting items by their labels

You can get items by their labels using the `get` method and the `{ label: 'labeln' }` option, or you can use the `getByLabel` convenience method. This method takes the label as the first parameter (e.g. `label3`), the `key` as the second parameter, and then an optional third parameter that accepts all the same options as the `get` method.

Labels support collections as well as simple keys. Since they behave the same way, you can also use collection querying methods like `*` and `>=` on labels as well.

Labels are incredibly powerful, allowing you to pivot and access your data in multiple "views". For example, if you store orders in a "user" collection (e.g. `user-1234`), then you can store their order date and number as the key (e.g. `user-1234:ORDER_2021-05-18_9321`). This would let you list all (or some) of their orders and sort them by date. But if you wanted to access this same information by the unique order number (`9321`), a simple key-value store wouldn't let you. With Serverless Data, you can set `label1` to something like `ORDER-9321`. Now you can either get the orders _BY USER_ or _BY ORDER ID_:

```javascript
// Set the order
let newOrder = await data.set(
  'user-1234:ORDER_2021-05-18_9321', // the key
  { ...the-order-data-here... }, // the details of the order
  { label1: 'ORDER-9321' } // our order id label
)

// Get all orders for user-1234
let user_orders = await data.getByLabel('label1','user-1234:ORDER_*');

// Get ORDER 9321
let order = await data.getByLabel('label1','ORDER-9321');
```

## Getting multiple items by their key

If you'd like to retrieve multiple items that aren't part of the same collection, you can specify an `array` of keys as the first argument in the `get` method. Keys must be the complete `key` as wildcards and other conditionals are not supported in batch operations. You can specify up to 25 keys in each request.

```javascript
let results = await data.get(["key1", "someOtherKey", "namespacedKey:keyX"]);
```

## Setting multiple items

To set multiple items at the same time, you can specify an `array` of objects that each contain a `key` and `value` as well as any additional meta data (e.g. labels and a `ttl` value) as the first argument of the `set` method. You can specify up to 25 items in each request. An optional second parameter supports either a boolean of `true` to enable metadata in the response, or an options object like `{ meta: true }`.

```javascript
let results = await data.set(
  [
    { key: "key1", value: "string value" },
    { key: "someOtherKey", value: 123, ttl: 1000 },
    { key: "namespacedKey:keyX", value: { foo: "bar" }, label1: "foo:baz }
  ]
);
```

**IMPORTANT NOTE:** Batch set operations are destructive and will completely overwrite existing items. They do not support PARTIAL updates like a single item `set` does.

## Removing items

You can remove items from Serverless Data by providing and item's key or an `array` of keys to the `remove()` method. Keys must be the complete `key` as wildcards and other conditionals are not supported in the `remove` operation. You can specify up to 25 keys in each request.

```javascript
let results = await data.remove("foo");
let results = await data.remove("foo:bar");
let results = await data.remove(["key1", "someOtherKey", "namespacedKey:keyX"]);
```

## Atomic counters

Atomic counters allow numeric items or numeric item object values to be atomically updated. Atomic updates ensure that addition and subtraction operations are processed in order, giving users the ability to maintain the integrity of counters even if there are multiple simultaneous requests.

### Updating a single value atomically

If you only need to update a single value, Serverless Data provides the `add` method to help you do that. If the item is a simple numeric value (e.g. `{ key: "myCounter", value: 10 }`, you provide the full key name (including collection namespace) as the first parameter and the numeric value you want to "add" to the existing value as the second parameter. Numbers can be positive or negative, and atomic counters support both integers and float values.

```javascript
let results = await data.add("myCounter", 1);
let results = await data.add("myNegativeCounter", -1);
```

The `add` method will return the updated value by default. You can specify an optional third parameter of `true` to return the item's metadata, or pass in an options object like `{ meta: true }`.

If the value you want to atomically update is nested within an object, you specify the full key name as the first parameter, the name of the nested object key you want to update as the second parameter, and a numeric value as the third parameter.

```javascript
let results = await data.add("myObject", "nestedCounter", 5);
```

The `add` method will return the updated object by default. You can specify an optional fourth parameter of `true` to return the item's metadata, or pass in an options object like `{ meta: true }`.

### Updating multiple values atomically

You may want to atomically update several fields with a single item and potentially update other values as well. You can achieve this using the standard `set` method along with a special `$add` keyword. You `set` an item like you normally would, but for any numeric value that you'd like to atomically update, you specify a value of `{ $add: 1 }`, where `1` is whatever value you wish to add. For example:

```javascript
let results = await data.set("myObject", {
  nestedCounter: { $add: 1 },
  anotherCounter: { $add: 5 },
  someOtherValue: "foo"
});
```

In the example above, `nestedCounter` will be atomically updated by `1` on every call and `anotherCounter` will be atomically updated by `5`. Please note that regular values like `someOtherValue` above **will not** be updated atomically and the last write wins.

## Reacting to changes

Serverless Data emits an event every time a data item is created, updated, or deleted, which you can react to by writing an event handler. This lets you decouple your application and process changes to your data asynchronously. For example your API could set data and then immediately send a response, while your event handler can do some data aggregation or send a request to an outside app.

### Defining event handlers

You define an event handler using the `data.on()` method.

```javascript
data.on("created", async (event) => {
  // an item has been created
});
```

The first argument is the event name: `created`, `updated`, or `deleted`. The second argument is your handler function, which receives a single "event" argument.

You can also react to more than one event using an array of event names, or `*` to react to any event:

```javascript
data.on(["created", "updated"], async (event) => {
  // an item has been created or updated
});

data.on("*", async (event) => {
  // an item has been created, updated, or deleted
});
```

It's possible for more than one handler to be called for a given change to a data item, in which case the handlers are called in the order they were defined. In the example above, the first handler will always be called the before the second handler when an item is created or updated, and only the second handler will be called when an item is deleted.

### Event format

The event passed to your handler has the following properties:

- `name`: the event name, which is one of `created`, `updated`, or `deleted`
- `item`: the item, including metadata and the value of the item in the `value` property
- `previous`: the previous state of the item when the event is `updated`

### Filtering by key

You can define a handler that is only called when specific keys are affected by adding namespace and key filters to the event name.

To add a filter you can use one of these formats:

- `<event-name>:<key-filter>`
- `<event-name>:<namespace-filter>:<key-filter>`

Each filter can either be an exact string or a prefix by adding `*` to the end of the filter.

For example, to filter using a specific simple key:

```javascript
data.on("*:global-item", (event) => {
  // called when the item with key `global-item` is created, updated or deleted
});
```

To filter using a simple key prefix:

```javascript
data.on("created:order_*", (event) => {
  // called when an item with a simple key starting with `order_` is created
});
```

To filter using both a namespace and key prefix:

```javascript
data.on("created:order_*:item_*", (event) => {
  // called when an item is created that has a namespace starting with `order_`
  // and a key starting with `item_`
});
```

### Event ordering

Data events are processed in the order that the changes were applied to your data items, within a item namespace. It's possible for multiple handlers to be invoked in parallel, but for different namespaces.

### Handling errors

If a handler throws an error, it will be retried with exponential backoff for up to 24 hours until it succeeds. After 24 hours the event will be dropped.

It's important to handle errors in your handler, since a failing handler will prevent new events from being processed.

Handlers should only throw an exception for "retryable" errors such as downstream request failures. If the error is a permanent error, the handler should use a try-catch block to capture the error and let the handler succeed.

### Avoiding event loops

It's possible to create an "event loop" where your event handler triggers itself and results in an infinite loop that exhausts resources. If you are calling `data.set()` or `data.remove()` within a handler, make sure it will not result in the same handler being invoked again with a new event.

### Timeouts

By default, data events will timeout after 20 seconds. To change the default, you can specify an object as your second parameter with a `timeout` key. Timeouts are specified in milliseconds and must be a positive integer. Data events support a maximum timeout of 60 seconds.

```javascript
data.on("created", { timeout: 1000 }, async (event) => {
  // an item has been created
  // timeout after 1 second
});
```
