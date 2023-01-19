import { FastifyReply, FastifyRequest } from "fastify";
import jwt, { JwtPayload } from "jsonwebtoken";

const verifyToken = (req: FastifyRequest, res: FastifyReply, done: (err?: Error) => void) => {
    jwt.verify(req.headers.token as string, process.env.SECRET_KEY as string, (err, decoded) => {
      if (err) throw new Error("Unauthenticated");
      req.user = decoded as JwtPayload;
      done();
    });
};

// const verifyUser: RouteHandlerMethod = (req, res) => {}

export default verifyToken;
