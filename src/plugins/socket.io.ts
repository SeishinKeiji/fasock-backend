import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { ServerOptions } from "socket.io";

const socketIO: FastifyPluginCallback<Partial<ServerOptions>> = (fastify, opts, done) => {
  fastify.decorate("io", require("socket.io")(fastify.server, opts));
  fastify.addHook("onClose", (fastify, done) => {
    fastify.io.close(done);
  });
  done();
};

export default fp(socketIO, { name: "fastify-socket.io" });
