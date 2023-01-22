import { FastifyPluginCallback } from "fastify";
import { IUserPayload } from "./user.entity";
import { userIdSchema, userData, userSchema, userResponseData } from "./user.schema";
import { UserService } from "./user.service";

interface IQueryID {
  id: number;
}

const UserController: FastifyPluginCallback = (app, _, next) => {
  const service = new UserService();

  app.addSchema(userData);
  app.addSchema(userIdSchema);
  app.addSchema(userResponseData);

  app.get(
    "/users",
    {
      preHandler: app.auth([app.verifyToken]),
    },
    async (_, res) => {
      const data = (await service.getUsers()).map(({ password, ...user }) => user);
      return res.send({ data });
    }
  );

  app.get<{ Querystring: IQueryID }>(
    "/user",
    {
      schema: userSchema.get,
      preHandler: app.auth([app.verifyToken]),
    },
    async (req, res) => {
      const data = await service.getUser(req.query.id);
      if (!data) return res.status(400).send({ message: "cannot find the user, invalid id" });
      return res.send({ data });
    }
  );

  app.post<{ Body: IUserPayload }>(
    "/user",
    {
      schema: userSchema.post,
    },
    async (req, res) => {
      const data = await service.create(req.body);
      return res.status(201).send({ data });
    }
  );

  app.put<{ Body: IUserPayload; Querystring: IQueryID }>(
    "/user",
    {
      schema: userSchema.put,
      preHandler: app.auth([app.verifyToken]),
    },
    async (req, res) => {
      const updatedData = await service.update(req.query.id, req.body);
      return res.send({ data: updatedData });
    }
  );

  app.delete<{ Querystring: IQueryID }>(
    "/user",
    {
      schema: userSchema.delete,
      preHandler: app.auth([app.verifyToken]),
    },
    async (req, res) => {
      await service.delete(req.query.id);
      return res.send({ message: "user successfuly deleted" });
    }
  );

  next();
};

export default UserController;
