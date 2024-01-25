const { handler } = require("./handler");
const dynamoDB = require("./infra/DynamoDbMock");

jest.mock("./infra/DynamoDbMock.js", () => {
  const dynamoDB = {
    get: jest.fn().mockReturnThis(),
    put: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    promise: jest.fn(),
  };
  return dynamoDB;
});

const mockEvent = (method, body, pathParameters = {}) => ({
  httpMethod: method,
  body: JSON.stringify(body),
  pathParameters,
});

describe("Lambda Handler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get a funcionario", async () => {
    const event = mockEvent("GET", null, { id: "1" });

    await handler(event);

    expect(dynamoDB.get).toHaveBeenCalled();
  });

  it("should create a funcionario", async () => {
    const event = mockEvent("POST", {
      ID: "1",
      Nome: "John Doe",
      Cargo: "Developer",
      Idade: "25",
    });

    await handler(event);

    expect(dynamoDB.put).toHaveBeenCalled();
  });

  it("should update a funcionario", async () => {
    const event = mockEvent(
      "PUT",
      { Nome: "Jane Doe", Cargo: "QA", Idade: "26" },
      { id: "1" }
    );

    await handler(event);

    expect(dynamoDB.update).toHaveBeenCalled();
  });

  it("should delete a funcionario", async () => {
    const event = mockEvent("DELETE", null, { id: "1" });

    await handler(event);

    expect(dynamoDB.delete).toHaveBeenCalled();
  });

  it("should handle unsupported operation", async () => {
    const event = mockEvent("PATCH");

    const response = await handler(event);

    expect(response.statusCode).toBe(400);
  });
});
