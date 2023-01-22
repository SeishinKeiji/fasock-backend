import fastify from "fastify";
import { Socket } from "socket.io";
import routes from "#plugins/router";
import handler from "#modules/v1/chat/chat.handler";
import socketIO from "#plugins/socket.io";
import typeorm from "#plugins/typeorm";
import verifyToken from "#plugins/auth";
import cors from "@fastify/cors";

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
  server.register(cors, {
    origin: "*",
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
      socket.on("error", (err) => {
        if (err && err.message === "unauthorized event") {
          socket.disconnect();
        }
      });
      handler(server.io, socket);
    };
    server.io.use((socket, next) => {
      if (!socket.handshake.auth.user) {
        return next(new Error("unauthorized event"));
      }
      socket.username = socket.handshake.auth.user.username;
      // socket.token = socket.handshake.auth.user.token;
      next();
    });
    server.io.on("connection", onConnection);
  });

  return server;
};
