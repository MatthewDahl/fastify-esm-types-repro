import type { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import Autoload from "@fastify/autoload";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const example: FastifyPluginAsync<FastifyPluginOptions> = async (
  fastify,
  opts
) => {
  // These routes will be created in their own child instances
  fastify.register(Autoload, {
    dir: path.join(__dirname, "routes"),
    options: {
      prefix: opts.prefix,
    },
    ignoreFilter: (path) =>
      ["schemas", "helpers"].some((dir) => path.includes(dir)),
  });
};

export default example;
