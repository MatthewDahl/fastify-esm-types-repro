/**
 * This file is used to register the ts-node/esm loader with Node.js.
 * This is required to use TypeScript with ESM modules.
 *
 * The below error message is provided by Node.js when using "node --loader ts-node/esm" to register the loader.
 *
 * (node:86222) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
 * --import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("ts-node/esm", pathToFileURL("./"));'
 *
 * github issue + register.js idea https://github.com/nodejs/node/issues/51196#issuecomment-1998216742
 *
 * @example
 * node --import=./register.js ./src/index.ts
 */

import { register } from 'node:module'
import { pathToFileURL } from 'node:url'

register('ts-node/esm', pathToFileURL('./'))
