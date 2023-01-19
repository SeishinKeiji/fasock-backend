import fastify from "fastify";
import { Socket } from "socket.io";
import routes from "#plugins/router";
import handler from "#handler";
import socketIO from "#plugins/socket.io";
import typeorm from "#plugins/typeorm";
import verifyToken from "#plugins/auth";

export default () => {
  const server = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    },
  });
  server.register(socketIO, {
    cors: {
      origin: "*",
    },
  });
  server.register(typeorm);
  server.decorate("verifyToken", verifyToken);
  server.register(require("@fastify/auth"));
  server.after(() => {
    server.register(routes);
  });

  server.ready(async (error) => {
    if (error) console.log(error), process.exit(1);
    const onConnection = (socket: Socket) => {
      handler(server.io, socket);
    };
    server.io.on("connection", onConnection);
  });

  return server;
};
