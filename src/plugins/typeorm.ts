// import fp from "fastify-plugin";
// import { datasource } from "database";
// import { FastifyPluginAsync } from "fastify";

// const typeorm: FastifyPluginAsync = async (fastify, _) => {
//   await datasource.initialize();
//   console.log(datasource.isInitialized ? "connection was successfuly created" : "failed to connect database");
//   fastify.decorate("db", datasource);
// };

// export default fp(typeorm, {
//   name: "fastify-typeorm",
// });
