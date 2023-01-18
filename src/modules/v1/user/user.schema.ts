import { FastifySchema } from "fastify";

export const userSchema: Record<string, FastifySchema> = {
  get: {
    querystring: { $ref: "UserIdPayload#" },
  },
  post: {
    body: {
      $ref: "UserData#",
      type: "object",
      required: ["email", "username", "password"],
    },
  },
  put: {
    body: { $ref: "UserData#" },
    querystring: {
      $ref: "UserIdPayload#",
    },
  },
  delete: {
    querystring: { $ref: "UserIdPayload#" },
  },
};

export const userData = {
  $id: "UserData",
  type: "object",
  additionalProperties: false,
  properties: {
    email: { type: "string" },
    username: { type: "string" },
    password: { type: "string" },
  },
};

export const userIdSchema = {
  $id: "UserIdPayload",
  type: "object",
  additionalProperties: false,
  required: ["id"],
  properties: {
    id: { type: "number" },
  },
};
