# Copy Variables

This project provides utilities to copy variables efficiently between different scopes and contexts in your code.

## Features

- Copy variables from one scope to another
- Support for various data types
- Easy integration with existing projects

## Installation

To install the package, use the following command:

```sh
npm install copy-variables
```

## Usage

Here's a simple example of how to use the `copy-variables` utility:

```javascript
const copyVariables = require('copy-variables');

let source = { a: 1, b: 2 };
let target = {};

copyVariables(source, target);

console.log(target); // { a: 1, b: 2 }
```

## License

This project is licensed under the MIT License.