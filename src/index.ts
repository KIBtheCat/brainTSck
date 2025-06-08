#!/usr/bin/env node

// -- START HEADER --

// Copyright (c) benja2998. You may redistribute under the terms of the GPL-3.0-or-later.
// brainTSck is a Brainfuck to JavaScript compiler written in TypeScript.

// -- END HEADER --

// -- START IMPORTS --

import * as fs from 'fs';
import * as path from 'path';

// -- END IMPORTS --

// Check if the provided file exists
// If it does, return the contents of the file
// If it doesn't, exit with an error

if (process.argv[2] == undefined) {
    console.log("Usage: braintsck <file>");
    process.exit(1);
}

const file = process.argv[2];

if (!fs.existsSync(file)) {
    console.log(`File ${file} does not exist`);
    process.exit(1);
}

const contents = fs.readFileSync(file, 'utf8');
let compiledContents = "";

compiledContents = `#!/usr/bin/env node

// DO NOT MODIFY.
// This is an automatically generated file by brainTSck. 
// If you want to modify it, modify ${file} and recompile by running: braintsck ${file}
const TAPE_SIZE = 30000;
const tape = new Uint8Array(TAPE_SIZE);
let pointer = 0;

`

// Display a banner

console.log(`
  _             _    _____ ___     _   
 | |__ _ _ __ _(_)_ |_   _/ __| __| |__
 | '_ \\ '_/ _\` | | ' \\| | \\__ \\/ _| / /
 |_.__/\\_| \\__,_|_|_||_|_| |___/\\__|_\\_\\
                                       
`);

console.log(`Compiling ${file}...`);

console.time("Compilation time");

// In a loop, store each character of <contents> in a variable

for (let i = 0; i < contents.length; i++) {
    const char = contents.charAt(i);
    switch (char) {
        case '+':
            console.log("Compiling '+'");
            compiledContents += `tape[pointer]++;
            
            `;
            break;
        case '-':
            console.log("Compiling '-'");
            compiledContents += `tape[pointer]--;

            `;
            break;
        case '>':
            console.log("Compiling '>'");
            compiledContents += `pointer = (pointer + 1) % TAPE_SIZE;

            `;
            break;
        case '<':
            console.log("Compiling '<'");
            compiledContents += `pointer = (pointer - 1 + TAPE_SIZE) % TAPE_SIZE;

            `;
            break;
        case '.':
            console.log("Compiling '.'");
            compiledContents += `process.stdout.write(String.fromCharCode(tape[pointer]));

            `;
            break;
        case ',':
            console.log("Compiling ','");
            compiledContents += `{
                const buffer = Buffer.alloc(1);
                require('fs').readSync(0, buffer, 0, 1, null);
                tape[pointer] = buffer[0];
            }
            
            `;
            break;
        case '[':
            console.log("Compiling '['");
            compiledContents += `while (tape[pointer] != 0) {

            `;
            break;
        case ']':
            console.log("Compiling ']'");
            compiledContents += `}

            `;
            break;
        default:
            console.log(`Skipping ${char}`);
            break;
    }
}

console.timeEnd("Compilation time");

// Get the file name without the extension

const fileName = path.parse(file).name;

// Write the compiled contents to a file named <fileName>.js

fs.writeFileSync(`${fileName}.js`, compiledContents);

console.log(`Compiled ${file} to ${fileName}.js`);
console.log(`Run it by running: node ${fileName}.js`);