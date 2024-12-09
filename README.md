# Fastify ESM TypeScript Type Augmentation Issue

This repository demonstrates an issue with TypeScript type augmentations in ESM modules when running tests with fastify-cli.

## The Issue

When using ESM modules with TypeScript, plugin type augmentations aren't visible during test execution. This specifically affects projects where plugins depend on other plugins' type augmentations, causing runtime errors in tests despite TypeScript compilation succeeding.

## Steps to Reproduce

1. Install dependencies:
```bash
npm install
```

2. Run the tests:
```bash
npm test
```

The test fails with:
```
✖ feature plugin type augmentations
  TypeError [Error]: Cannot read properties of undefined (reading 'value')
      at TestContext.<anonymous> (file:///path/to/test/plugins/feature.test.ts:6:30)
```

This error shows that:
- TypeScript compilation passes (types are visible)
- But runtime access to plugin decorations fails
- Plugin dependencies aren't properly loaded in test environment

## Project Structure

- `src/plugins/config.ts`: Base plugin with type augmentations
- `src/plugins/feature.ts`: Plugin that depends on `config` plugin's types
- `test/plugins/feature.test.ts`: Test demonstrating the type augmentation issue

## Environment

- Node.js v20.x
- TypeScript 5.x
- fastify-cli 7.x
- ESM modules enabled
- Using `"module": "NodeNext"` in tsconfig.json

## Related Issue

See the full discussion at: https://github.com/fastify/fastify-cli/issues/781
