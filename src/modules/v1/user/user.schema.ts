export const createUserSchema = {
  $id: "CreateUser",
  $ref: "UserData#",
  type: "object",
  additionalProperties: false,
  required: ["email", "username", "password"],
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

export const readUserSchema = {
  $id: "ReadUser",
  type: "object",
  additionalProperties: false,
  required: ["id"],
  properties: {
    id: { type: "number" },
  },
};
export const updateUserSchema = {
  $ref: "UserData#",
  $id: "UpdateUser",
};
export const deleteUserSchema = {
  $id: "DeleteUser",
  type: "object",
  additionalProperties: false,
  required: ["id"],
  properties: {
    id: { type: "number" },
  },
};
