const fs = require('fs-extra');

const manifestJson = fs.readJsonSync('./manifest.json');
const packageJson = fs.readJsonSync('./package.json');

// Sync version and description
packageJson.version = manifestJson.version;
packageJson.description = manifestJson.description;

// Write the updated manifest back to file
fs.writeJsonSync('./package.json', packageJson, { spaces: 2 });
