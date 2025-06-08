"use strict";
// -- START HEADER --
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) benja2998. You may redistribute under the terms of the GPL-3.0-or-later.
// brainTSck is a Brainfuck to JavaScript compiler written in TypeScript.
// -- END HEADER --
// -- START IMPORTS --
var fs = require("fs");
// -- END IMPORTS --
// Check if the provided file exists
// If it does, return the contents of the file
// If it doesn't, exit with an error
if (process.argv[2] == undefined) {
    console.log("Usage: node . <file> , or if you're using the global package, brainTSck <file>");
    process.exit(1);
}
var file = process.argv[2];
if (!fs.existsSync(file)) {
    console.log("File ".concat(file, " does not exist"));
    process.exit(1);
}
var contents = fs.readFileSync(file, 'utf8');
var compiledContents = "";
compiledContents = "\nconst TAPE_SIZE = 30000;\nconst tape = new Uint8Array(TAPE_SIZE);\nlet pointer = 0;\n\n";
// In a loop, store each character of <contents> in a variable
for (var i = 0; i < contents.length; i++) {
    var char = contents.charAt(i);
    switch (char) {
        case '+':
            compiledContents += "tape[pointer]++;\n            \n            ";
            compiledContents += "if (pointer >= TAPE_SIZE) pointer = 0;\n\n            ";
            break;
        case '-':
            compiledContents += "tape[pointer]--;\n\n            ";
            compiledContents += "if (pointer >= TAPE_SIZE) pointer = -1;\n\n            ";
            break;
        case '>':
            compiledContents += "pointer++;\n\n            ";
            break;
        case '<':
            compiledContents += "pointer--;\n\n            ";
            break;
        case '.':
            compiledContents += "process.stdout.write(String.fromCharCode(tape[pointer]));\n\n            ";
            break;
        case ',':
            compiledContents += "tape[pointer] = process.stdin.read();\n\n            ";
            compiledContents += "if (tape[pointer] !== null) {\n\n            ";
            compiledContents += "   tape[pointer] = tape[pointer].charCodeAt(0);\n\n            ";
            compiledContents += "}\n\n            ";
            break;
        case '[':
            compiledContents += "while (tape[pointer] != 0) {\n\n            ";
            break;
        case ']':
            compiledContents += "}\n\n            ";
            break;
        default:
            break;
    }
}
// Get the file name without the extension
var fileName = file.split('.')[0];
// Write the compiled contents to a file named <fileName>.js
fs.writeFileSync("".concat(fileName, ".js"), compiledContents);
