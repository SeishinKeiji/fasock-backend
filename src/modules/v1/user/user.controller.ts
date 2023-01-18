import { FastifyPluginCallback } from "fastify";
import { IUserPayload } from "./user.entity";
import { createUserSchema, deleteUserSchema, readUserSchema, updateUserSchema } from "./user.schema";
import { UserService } from "./user.service";

interface IQueryID {
  id: number;
}

const UserController: FastifyPluginCallback = (app, _, next) => {
  const service = new UserService();

  app.addSchema(createUserSchema).addSchema(readUserSchema).addSchema(updateUserSchema).addSchema(deleteUserSchema);

  app.get("/users", async (_, res) => {
    return res.send({ data: await service.getUsers() });
  });

  app.get<{ Querystring: IQueryID }>(
    "/user",
    {
      schema: {
        querystring: { $ref: "ReadUser#" },
      },
    },
    async (req, res) => {
      return res.send({ data: await service.getUser(req.query.id) });
    }
  );

  app.post<{ Body: IUserPayload }>(
    "/user",
    {
      schema: {
        body: {
          $ref: "CreateUser#",
        },
      },
    },
    async (req, res) => {
      const data = await service.create(req.body);
      res.status(201).send({ data });
    }
  );

  app.put<{ Body: IUserPayload; Querystring: IQueryID }>(
    "/user",
    {
      schema: {
        body: { $ref: "UpdateUser#" },
      },
    },
    async (req, res) => {
      const updatedData = await service.update(req.query.id, req.body);
      return res.send(updatedData);
    }
  );

  app.delete<{ Querystring: IQueryID }>(
    "/user",
    {
      schema: {
        querystring: { $ref: "DeleteUser#" },
      },
    },
    async (req, res) => {
      await service.delete(req.query.id);
      return res.send({ message: "user successfuly deleted" });
    }
  );

  next();
};

export default UserController;
