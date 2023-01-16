import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { Server, ServerOptions } from "socket.io";
import { DataSource } from "typeorm";

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
    datasource: DataSource;
  }
}

const socketIO: FastifyPluginCallback<Partial<ServerOptions>> = (fastify, opts, done) => {
  fastify.decorate("io", require("socket.io")(fastify.server, opts));
  fastify.addHook("onClose", (fastify, done) => {
    fastify.io.close();
    done();
  });
  done();
};

export default fp(socketIO, { name: "fastify-socket.io" });
