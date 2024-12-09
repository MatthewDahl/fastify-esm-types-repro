# Fastify ESM TypeScript Type Augmentation Issue

This repository demonstrates an issue with TypeScript type augmentations in ESM modules when running tests with fastify-cli.

## The Issue

When using ESM modules with TypeScript, plugin type augmentations aren't visible during test execution. This specifically affects projects where plugins depend on other plugins' type augmentations.

## Steps to Reproduce

1. Install dependencies:
```bash
npm install
```

2. Run the tests:
```bash
npm test
```

You'll see the scaffolded example tests fail with:
```
AssertionError [ERR_ASSERTION]: The dependency 'config' of plugin 'feature-auto-1' is not registered
```

## Project Structure

- `src/plugins/config.ts`: Base plugin with type augmentations
- `src/plugins/feature.ts`: Plugin that depends on `config` plugin's types

## Environment

- Node.js v20.x
- TypeScript 5.x
- fastify-cli 7.x
- ESM modules enabled
- Using `"module": "NodeNext"` in tsconfig.json

## Related Issue

See the full discussion at: [fastify-cli issue link]
