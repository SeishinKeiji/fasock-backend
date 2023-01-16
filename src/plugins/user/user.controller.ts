import { FastifyPluginCallback } from "fastify";

export const UserController: FastifyPluginCallback = (server, opts, next) => {
  server.get("/user", (req, res) => {
    res.send({ response: "user endpoint" });
  });

  next();
};
