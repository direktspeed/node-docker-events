# node-docker-events
Create an event emitter from dockerode's events Stream

Overview
--------

Docker exposes an event API, allowing one to monitor the happenings of a Docker
host. dockerode allows for consumption of this API as node Stream @direktspeed/docker-events 
parsing the response stream and pushing things out of an EventEmitter.

API
---

### DockerEvents (constructor)

accepts all dockerode options
```js
var dockerEvents = new DockerEvents(options);
```

### start

```js
dockerEvents.start();
```

### stop

```js
dockerEvents.stop();
```

### #connect

```js
dockerEvents.on("connect", function() {
  console.log("connected to docker api");
});
```

### #disconnect

```js
dockerEvents.on("disconnect", function() {
  console.log("disconnected to docker api; reconnecting");
});
```

### #_message

```js
dockerEvents.on("_message", function(message) {
  console.log("got a message from docker: %j", message);
});
```

### #create

```js
dockerEvents.on("create", function(message) {
  console.log("container created: %j", message);
});
```

### #start

```js
dockerEvents.on("start", function(message) {
  console.log("container started: %j", message);
});
```

### #stop

```js
dockerEvents.on("stop", function(message) {
  console.log("container stopped: %j", message);
});
```

### #die

```js
dockerEvents.on("die", function(message) {
  console.log("container died: %j", message);
});
```

### #destroy

```js
dockerEvents.on("destroy", function(message) {
  console.log("container destroyed: %j", message);
});
```
