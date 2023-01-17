import { FastifyPluginCallback } from "fastify";
import { IUserPayload } from "./user.entity";
import { UserService } from "./user.service";

interface IQueryID {
  id: number;
}

const UserController: FastifyPluginCallback = (app, opts, next) => {
  const service = new UserService();
  app.get("/users", async (_, res) => {
    return res.send({ data: await service.getUsers() });
  });

  app.get<{ Querystring: IQueryID }>("/user", async (req, res) => {
    return res.send({ data: await service.getUser(req.query.id) });
  });

  app.post<{ Body: IUserPayload }>("/user", async (req, res) => {
    const data = await service.create(req.body);
    res.status(201).send({ data });
  });

  app.put<{ Body: IUserPayload; Querystring: IQueryID }>("/user", async (req, res) => {
    const updatedData = await service.update(req.query.id, req.body);
    return res.send(updatedData);
  });

  app.delete<{ Querystring: IQueryID }>("/user", async (req, res) => {
    await service.delete(req.query.id);
    return res.send({ message: "user successfuly deleted" });
  });

  next();
};

export default UserController;
