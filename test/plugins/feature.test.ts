import { test } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../helper.js'

test('feature plugin type augmentations', async (t) => {
  const app = await build(t)

  // This line should cause TypeScript errors without proper type augmentations
  const value: string = app.config.value
  assert.equal(value, 'test')

  // This should also cause TypeScript errors
  const configValue: string = app.feature.configValue
  assert.equal(configValue, 'test')
})