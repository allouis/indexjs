# indexjs [![Build Status](https://travis-ci.org/allouis/indexjs.svg?branch=master)](https://travis-ci.org/allouis/indexjs)

You can use indexjs to simplify the requiring of similar modules within a directory, for examples models;

## API

### `indexjs(directory, output, [transform])`
directory will usually be __dirname, when run from index.js of a directory.

output can be either an array or an object, it doesn't have to be empty.

transform is an optional function that gets called on all the required modules, the return value is used instead of the module

## Usage

### File structure

```
-- app.js
-- models/
----- index.js
----- user.js
----- comment.js
----- post.js
----- .hiddenfile
-- routers/
----- index.js
----- user.js
----- comment.js
----- post.js

```
### models/index.js
```javascript

/**
 * /project/models/index.js
 */

var indexjs = require('indexjs');
module.exports = indexjs(__dirname, {}, function (model) {
  return model.init(); // example of transform
});
```
### routers/index.js
```javascript

/**
 * /project/routers/index.js
 */

var indexjs = require('indexjs');
module.exports = indexjs(__dirname, []);
```
### app.js
```javascript

/**
 * /project/app.js
 */
 
var models = require('./models');
var routers = require('./routers');
routers.forEach(function(router) {
 router(app);
});

models.user; // the equivalent of require('./models/user');
models.comment; // the quivalent of require('./models/comment');
// etc..
models['.hiddenfile']; // undefined;
```
