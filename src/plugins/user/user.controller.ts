import { FastifyPluginCallback } from "fastify";
import { IUser } from "./user.entity";
import { UserService } from "./user.service";

interface IQueryID {
  id: number;
}

export const UserController: FastifyPluginCallback = (server, opts, next) => {
  const service = new UserService();
  server.get("/users", async (_, res) => {
    res.send({ data: await service.getUsers() });
  });

  server.get<{ Querystring: IQueryID }>("/user", async (req, res) => {
    res.send({ data: service.getUser(req.query.id) });
  });

  server.post<{ Body: IUser }>("/user", async (req, res) => {
    const data = await service.create(req.body);
    res.send({ data });
  });

  server.put<{ Body: IUser; Querystring: IQueryID }>("/user", async (req, res) => {
    const updatedData = await service.update(req.query.id, req.body);
    res.send(updatedData);
  });

  server.delete<{ Querystring: IQueryID }>("/user", async (req, res) => {
    await service.delete(req.query.id);
    res.send({ status: "ok", message: "user successfuly deleted" });
  });

  next();
};
