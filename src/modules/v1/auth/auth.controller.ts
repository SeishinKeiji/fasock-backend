import { FastifyPluginCallback } from "fastify";
import jwt from "jsonwebtoken";
import { UserService } from "#modules/v1/user/user.service";
import { UserEntity } from "#modules/v1/user/user.entity";
import { authSchema } from "./auth.schema";

interface ILoginPayload extends Pick<UserEntity, "email" | "password"> {}

const AuthController: FastifyPluginCallback = (app, _, next) => {
  app.post<{ Body: ILoginPayload }>("/login", { schema: authSchema.login }, async (req, res) => {
    const userService = new UserService();
    const user = await userService.findUser(req.body.email);
    if (!user) throw new Error("User not found");
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, { expiresIn: process.env.EXPIRES_IN });
    res.send({ token, username: user.username });
  });

  next();
};

export default AuthController;
