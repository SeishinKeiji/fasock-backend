import "dotenv/config";
import InitializeServer from "#server";
import { Server } from "socket.io";
import { DataSource } from "typeorm";
import { JwtPayload } from "jsonwebtoken";

declare module "fastify" {
  interface FastifyInstance {
    io: Server;
    datasource: DataSource;
    auth: any;
    verifyToken: any;
  }

  interface FastifyRequest {
    user: JwtPayload;
  }
}

const server = InitializeServer();
server.listen({ port: (process.env.HOST_PORT as any) || 4040, host: process.env.HOST_NAME || "localhost" });
