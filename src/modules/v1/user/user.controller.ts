import { FastifyPluginCallback } from "fastify";
import { IUserPayload } from "./user.entity";
import { createUserSchema, deleteUserSchema, userIdSchema, updateUserSchema, userData, userSchema } from "./user.schema";
import { UserService } from "./user.service";

interface IQueryID {
  id: number;
}

const UserController: FastifyPluginCallback = (app, _, next) => {
  const service = new UserService();

  app
  .addSchema(userData)
  .addSchema(userIdSchema)
  .addSchema(createUserSchema)
  .addSchema(updateUserSchema)
  .addSchema(deleteUserSchema);

  app.get("/users", async (_, res) => {
    return res.send({ data: await service.getUsers() });
  });

  app.get<{ Querystring: IQueryID }>(
    "/user",
    {
      schema: userSchema.get,
    },
    async (req, res) => {
      return res.send({ data: await service.getUser(req.query.id) });
    }
  );

  app.post<{ Body: IUserPayload }>(
    "/user",
    {
      schema: userSchema.post,
    },
    async (req, res) => {
      const data = await service.create(req.body);
      res.status(201).send({ data });
    }
  );

  app.put<{ Body: IUserPayload; Querystring: IQueryID }>(
    "/user",
    {
      schema: userSchema.put,
    },
    async (req, res) => {
      const updatedData = await service.update(req.query.id, req.body);
      return res.send(updatedData);
    }
  );

  app.delete<{ Querystring: IQueryID }>(
    "/user",
    {
      schema: userSchema.delete,
    },
    async (req, res) => {
      await service.delete(req.query.id);
      return res.send({ message: "user successfuly deleted" });
    }
  );

  next();
};

export default UserController;
