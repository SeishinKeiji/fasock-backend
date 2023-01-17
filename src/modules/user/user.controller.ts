import { FastifyPluginCallback } from "fastify";
import { IUserPayload } from "./user.entity";
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
    res.send({ data: await service.getUser(req.query.id) });
  });

  server.post<{ Body: IUserPayload }>("/user", async (req, res) => {
    const data = await service.create(req.body);
    res.status(201).send({ data });
  });

  server.put<{ Body: IUserPayload; Querystring: IQueryID }>("/user", async (req, res) => {
    const updatedData = await service.update(req.query.id, req.body);
    res.send(updatedData);
  });

  server.delete<{ Querystring: IQueryID }>("/user", async (req, res) => {
    await service.delete(req.query.id);
    res.send({ message: "user successfuly deleted" });
  });

  next();
};
