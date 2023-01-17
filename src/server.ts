import fastify from "fastify";
import { Socket } from "socket.io";
import routes from "#router";
import handler from "#handler";
import socketIO from "#plugins/socket.io";
import typeorm from "#plugins/typeorm";

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
  routes.map((route) => {
    server.register(route);
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
