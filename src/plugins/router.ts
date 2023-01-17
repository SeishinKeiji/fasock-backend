import { FastifyInstance, FastifyPluginCallback } from "fastify";
import { resolve } from "node:path";
import fs from "node:fs/promises";

async function load(app: FastifyInstance, dir: string) {
  dir = resolve(dir);
  const st = await fs.stat(dir);
  if (st.isDirectory()) {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const fullPath = resolve(`${dir}/${file}`);
      const st = await fs.stat(fullPath);
      if (st.isDirectory()) {
        await load(app, fullPath);
      } else {
        const ext = file.split(".").pop();
        const isController = file.split(".").find((file) => file === "controller");
        if (isController && ext === ("ts" || "js")) {
          const fl = require(fullPath);
          app.register(fl.default, { prefix: "v1" });
        }
      }
    }
  } else {
    throw new Error("The second argument must be a valid directory!");
  }
}

const routes: FastifyPluginCallback = async (app, _, done) => {
  await load(app, "src/modules");
  done();
};

export default routes;
