import initialize from "#server";

const user = {
  email: "test@s.c",
  username: "tester 1",
  password: "secret0101",
};

const users = [user];

const dbMock = {
  User: {
    find: jest.fn().mockReturnValue(users),
    findOne: jest.fn().mockReturnValue(user),
    save: jest.fn().mockReturnValue(user),
    delete: jest.fn(),
  },
};

describe("Server", () => {
  const server = initialize();
  beforeEach(async () => {
    await server.ready();
  });
  afterAll(() => server.close());

  test("POST /user creates a user", (done) => {
    server.inject(
      {
        method: "POST",
        url: "/user",
        payload: user,
      },
      (err, res) => {
        expect(res.statusCode).toBe(201);
        done(err);
      }
    );
  });

  test("GET /user get spesific user", (done) => {
    server.inject(
      {
        method: "GET",
        url: "/user",
        query: {
          id: "1",
        },
      },
      (err, res) => {
        expect(res.statusCode).toBe(200);
        done(err);
      }
    );
  });

  test("GET /users get all users", (done) => {
    server.inject(
      {
        method: "GET",
        url: "/users",
      },
      (err, res) => {
        expect(res.statusCode).toBe(200);
        // expect(dbMock.User.find).toHaveBeenCalled();
        done(err);
      }
    );
  });

  test("PUT /user update spesific user", (done) => {
    server.inject(
      {
        method: "PUT",
        url: "/user",
        payload: {
          ...user,
          id: 1,
          username: "updated",
        },
      },
      (err, res) => {
        expect(res.statusCode).toBe(200);
        // expect(dbMock.User.findOne).toHaveBeenCalledWith(1);
        done(err);
      }
    );
  });

  test("DELETE /user delete a user", (done) => {
    server.inject(
      {
        method: "DELETE",
        url: "/user",
        query: {
          id: "1",
        },
      },
      (err, res) => {
        expect(res.statusCode).toBe(200);
        // expect(dbMock.User.findOne).toHaveBeenCalledWith(1);
        // expect(dbMock.User.delete).toHaveBeenCalledWith(1);
        done(err);
      }
    );
  });
});
