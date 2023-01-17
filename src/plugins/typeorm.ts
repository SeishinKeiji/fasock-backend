import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { datasource } from "#database";

const typeorm: FastifyPluginAsync = async () => {
  await datasource.initialize();
  console.log(datasource.isInitialized ? "connection was successfuly created" : "failed to connect database");
};

export default fp(typeorm, {
  name: "fastify-typeorm",
});
