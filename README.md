# indexjs

You can use indexjs to simplify the requiring of similar modules within a directory, for examples models;

## API

### `indexjs(directory, output)`
directory will usually be __dirname, when run from index.js of a directory.
output can be either an array or an object, it doesn't have to be empty.

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

```
### models/index.js
```javascript

/**
 * /project/models/index.js
 */

var indexjs = require('indexjs');
module.exports = indexjs(__dirname, {});

```
### app.js
```javascript

/**
 * /project/app.js
 */
 
var models = require('./models');
models.user; // the equivalent of require('./models/user');
models.comment; // the quivalent of require('./models/user');
// etc..
models['.hiddenfile']; // undefined;

```
