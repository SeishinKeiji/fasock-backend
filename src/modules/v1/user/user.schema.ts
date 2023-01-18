import { FastifySchema } from "fastify";

const response = {
  "2xx": {
    type: "object",
    properties: {
      data: {
        $ref: "UserResponseData#",
      },
    },
  },
};

export const userSchema: Record<string, FastifySchema> = {
  get: {
    querystring: { $ref: "UserIdPayload#" },
    response,
  },
  post: {
    body: {
      $ref: "UserData#",
      type: "object",
      required: ["email", "username", "password"],
    },
    response,
  },
  put: {
    body: { $ref: "UserData#" },
    querystring: {
      $ref: "UserIdPayload#",
    },
    response,
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

export const userResponseData = {
  $id: "UserResponseData",
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "number" },
    username: { type: "string" },
    email: { type: "string" },
    created_at: { type: "string" },
    updated_at: { type: "string" },
  },
};
