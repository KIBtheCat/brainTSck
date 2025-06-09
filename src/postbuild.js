// -- START HEADER --

// Copyright (c) benja2998. You may redistribute under the terms of the GPL-3.0-or-later.
// brainTSck is a Brainfuck to JavaScript compiler written in TypeScript.

// -- END HEADER --

// -- START IMPORTS --

import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';

// -- END IMPORTS --

const filePath = path.join(__dirname, 'dist', 'brainTSck.js');

// Check if the file exists

if (fs.existsSync(filePath)) {
	// Read the file content
	const contents = fs.readFileSync(filePath, 'utf8');

	if (!contents.startsWith('#!/usr/bin/env node\n')) {
		// Prepend the shebang line
		const updatedContents = '#!/usr/bin/env node\n' + contents;

		// Write the updated content back to the file
		fs.writeFileSync(filePath, updatedContents, 'utf8');
	}

	// Check if the platform is Windows

	if (process.platform === 'win32') {
		// Not needed to make the file executable on Windows
	} else {
		// Use Unix-like command to make the file executable
		child_process.execSync(`chmod +x "${filePath}"`);
	}
}
