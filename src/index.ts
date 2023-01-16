import "dotenv/config";
import InitializeServer from "#server";

const server = InitializeServer();
server.listen({ port: (process.env.HOST_PORT as any) || 4040, host: process.env.HOST_NAME || "localhost" });
