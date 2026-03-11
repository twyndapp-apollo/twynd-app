const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Watch the shared package directory for changes
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');
const sharedPackagesRoot = path.resolve(monorepoRoot, 'packages');

config.watchFolders = [
  ...config.watchFolders || [],
  sharedPackagesRoot,
];

// Configure resolver to look in the shared package
config.resolver.extraNodeModules = {
  '@twynd/shared': path.resolve(monorepoRoot, 'packages/shared'),
};

// Ensure we're resolving the shared package correctly
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
