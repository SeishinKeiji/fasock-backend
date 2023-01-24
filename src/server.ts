import fastify from "fastify";
import { Socket } from "socket.io";
import routes from "#plugins/router";
import handler from "#modules/v1/chat/chat.handler";
import socketIO from "#plugins/socket.io";
import typeorm from "#plugins/typeorm";
import verifyToken from "#plugins/auth";
import cors from "@fastify/cors";
import { InMemorySessionStore, randomId } from "#utils";

export const sessionStore = new InMemorySessionStore();

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
      handler(server.io, socket);
    };
    server.io.use((socket, next) => {
      const sessionID = socket.handshake.auth.sessionID;
      if (sessionID) {
        const session = sessionStore.findSession(sessionID);

        if (session) {
          socket.sessionID = sessionID;
          socket.userID = session.userID;
          socket.username = session.username;
          return next();
        } else {
          const username = socket.handshake.auth.username;
          if (!username) {
            return next(new Error("invalid username"));
          }

          socket.sessionID = sessionID;
          socket.userID = randomId();
          socket.username = username;
          return next();
        }
      }
      next();
    });
    server.io.on("connection", onConnection);
  });

  return server;
};
