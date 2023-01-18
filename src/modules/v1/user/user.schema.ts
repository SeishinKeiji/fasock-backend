export const createUserSchema = {
  $id: "CreateUser",
  type: "object",
  additionalProperties: false,
  required: ["email", "username", "password"],
  properties: {
    email: { type: "string" },
    username: { type: "string" },
    password: { type: "string" },
  },
};

// export const userData = {
//   $id: "UserData",
//   type: "object",
//   definitions: {
//     email: { type: "string" },
//     username: { type: "string" },
//     password: { type: "string" },
//   },
// };

export const readUserSchema = {
  $id: "ReadUser",
  type: "object",
  additionalProperties: false,
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};
export const updateUserSchema = {
  $id: "UpdateUser",
  type: "object",
  additionalProperties: false,
  properties: {
    email: { type: "string" },
    username: { type: "string" },
    password: { type: "string" },
  },
};
export const deleteUserSchema = {
  $id: "DeleteUser",
  type: "object",
  additionalProperties: false,
  required: ["id"],
  properties: {
    id: { type: "string" },
  },
};
