# brainTSck

[![node.js package](https://img.shields.io/badge/node.js-package-green.svg?style=for-the-badge)](https://www.npmjs.com/package/braintsck)

Brainfuck to JavaScript compiler in TypeScript

With this package, you can write node.js programs in brainfuck, the absolute best programming language!

## Installation

Install with npm:
```bash
npm install -g braintsck
```

### Manual installation

Clone the repository:
```bash
git clone https://github.com/benja2998/brainTSck.git
```
Compile to JavaScript:
```bash
npm run build
```
Run it:
```bash
node dist/index.js
```

## Usage

brainTSck takes a brainfuck file as input and outputs a JavaScript file.

You can try the hello.bf file provided in the repository:
```bash
braintsck hello.bf
```

## Writing a package

You can make a brainfuck file called index.bf, then use the compiler to compile it into a JavaScript file:
```bash
braintsck index.bf
```

## Why use this

You can write node.js programs in brainfuck.

## License

brainTSck is freely redistributable under the terms of the GPL-3.0-or-later.