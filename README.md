Taleo HCM REST API SDK for Node.js
==================================

[![NPM](https://nodei.co/npm/taleo-node-sdk.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/taleo-node-sdk/)

[![Build Status](https://travis-ci.org/paulholden2/taleo-node-sdk.svg?branch=master)](https://travis-ci.org/paulholden2/taleo-node-sdk) [![dependencies Status](https://david-dm.org/paulholden2/taleo-node-sdk/status.svg)](https://david-dm.org/paulholden2/taleo-node-sdk) [![devDependencies Status](https://david-dm.org/paulholden2/taleo-node-sdk/dev-status.svg)](https://david-dm.org/paulholden2/taleo-node-sdk?type=dev)

A Node.js REST API SDK for Taleo Business Edition. The data in Taleo is structured
as entities and relationships. Each entity type can have relationships to other entities,
e.g. an `employee` can upload documents during onboarding, so there will be an `attachment`
relationship which relates the `employee` with their `attachment`s.

Relationships are typically queried with the following URI:

`/object/{entity}/{id}/{relationship}`

The SDK provides neat interfaces for these (see below example for getting employee attachments).

# Examples

#### Connect

```js
const Taleo = require('taleo-node-sdk');

var taleo = new Taleo({
  orgCode: 'YOURCOMPANYCODE',
  username: 'your_username',
  password: 'your_password'
});

// ...
```

#### Disconnect

```js
taleo.close((err) => {
  // All queued requests are complete and the client is logged out
});

// Once close() is called, new requests will return an error
```

## Employees

#### Get employee by ID

```js
taleo.getEmployee(12345, (err, employee) => {
  // ...
});
```

#### Get employee attachments

```js
taleo.getEmployee(12345, (err, employee) => {
  taleo.getAttachments(employee, (err, attachments) => {
    // ...
  });
});
```

#### Get employee packets

```js
taleo.getEmployee(12345, (err, employee) => {
  taleo.getPackets(employee, (err, packets) => {
    // ...
  });
});
```

## Packets

#### Get packet by ID

```js
taleo.getPacket(7890, (err, packet) => {
  // ...
});
```

#### Get packet activities

```js
taleo.getPacket(7890, (err, packet) => {
  taleo.getActivities(packet, (err, activities) => {
    // ...
  });
});
```

## Activities

#### Get activity by ID

```js
taleo.getActivity(7654, (err, activity) => {
  // ...
});
```

#### Download activity

Download and activity form as a PDF and write the contents to a writable stream.

```js
taleo.getActivity(7654, (err, activity) => {
  taleo.downloadActivity(activity, fs.createWriteStream('activity.pdf'), (err) => {
    // ...
  });
});
```

#### Get activity form as readable stream

Since requests are handled in a queue, your file may not download immediately
when downloadActivity() is called. As such, the readable stream is passed
as an argument to a handler function which you can then use. The readable
stream is a wrapper around a request, so it must be consumed otherwise the
request will not go through, blocking the queue.

```js
taleo.getActivity(7654, (err, activity) => {
  taleo.downloadActivity(activity, (stream) => {
    stream.pipe(fs.createWriteStream('activity.pdf'));
  }, (err) => {
    // ...
  });
});
```
