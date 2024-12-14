# Fastify ESM TypeScript Type Augmentation Issue

This repository demonstrates and solves an issue with TypeScript type augmentations in ESM modules when running tests with fastify-cli.

## The Issue

When using ESM modules with TypeScript, plugin type augmentations aren't properly exposed during test execution. This specifically affects projects where plugins depend on other plugins' type augmentations, causing runtime errors in tests despite TypeScript compilation succeeding.

## Original Error

Without the `skipOverride` configuration, tests would fail with:

```
✖ feature plugin type augmentations
  TypeError [Error]: Cannot read properties of undefined (reading 'value')
      at TestContext.<anonymous> (file:///path/to/test/plugins/feature.test.ts:6:30)
```

This error occurred because:
- TypeScript compilation passed (types were visible)
- But runtime access to plugin decorations failed
- Plugin dependencies weren't properly loaded in test environment

## Solution

The issue is resolved by setting `skipOverride: true` in the test helper configuration:

```typescript
async function config() {
  return {
    // Ensures plugin decorators are properly exposed in test environment
    // See: https://github.com/fastify/fastify-cli#test-helpers
    // See also: https://github.com/fastify/fastify-cli/issues/781#issuecomment-2541100755
    skipOverride: true,
  }
}
```

This ensures that plugin decorators are properly exposed in the test environment.

## Project Structure

This project structure mirrors the original enterprise application where this issue was discovered. It follows a modular monolith approach that we use in production:

### Core Directories
- `src/plugins/`: Shared functionality via fastify decorators
  * `config.ts`: Base plugin with type augmentations
  * `feature.ts`: Plugin that depends on `config` plugin's types
  * `support.ts`: Standalone plugin example
  * `sensible.ts`: Error handling utilities

- `src/modules/`: Application modules (formerly routes)
  * Each module is self-contained with its own routes, schemas, and helpers
  * Supports future extraction into microservices
  * Uses autoload for automatic registration
  * Structure proven effective in enterprise environments

### Test Structure
- `test/plugins/`: Plugin-specific tests
  * `feature.test.ts`: Demonstrates working type augmentations
  * `support.test.ts`: Standalone plugin test example

### Configuration
- `scripts/register.js`: ESM TypeScript loader configuration
- `tsconfig.json`: TypeScript configuration with ESM support
- Uses `"module": "NodeNext"` for modern ESM handling

## Environment

- Node.js v20.x
- TypeScript 5.x
- fastify-cli 7.x
- ESM modules enabled
- Using `"module": "NodeNext"` in tsconfig.json

## Related Links

- Issue Discussion: https://github.com/fastify/fastify-cli/issues/781
- Fastify Test Helpers: https://github.com/fastify/fastify-cli#test-helpers
