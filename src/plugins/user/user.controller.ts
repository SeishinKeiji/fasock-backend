import { FastifyPluginCallback } from "fastify";
import { UserService } from "./user.service";

export const UserController: FastifyPluginCallback = (server, opts, next) => {
  const service = new UserService();
  server.get("/users", async (_, res) => {
    res.send({ data: await service.users() });
  });

  next();
};
