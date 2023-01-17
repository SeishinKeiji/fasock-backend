import fp from "fastify-plugin";
import { FastifyPluginCallback } from "fastify";
import { datasource } from "#database";

const typeorm: FastifyPluginCallback = async (app, _, done) => {
  await datasource.initialize();
  console.log(datasource.isInitialized ? "connection was successfuly created" : "failed to connect database");
  done();
};

export default fp(typeorm, {
  name: "fastify-typeorm",
});
