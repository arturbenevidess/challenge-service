const dynamoDB = require("./infra/DynamoDbMock");

module.exports.handler = async (event) => {
  const operation = event.httpMethod;

  switch (operation) {
    case "GET":
      return getFuncionario(event);
    case "POST":
      return createFuncionario(event);
    case "PUT":
      return updateFuncionario(event);
    case "DELETE":
      return deleteFuncionario(event);
    default:
      return sendResponse(400, "Operação não suportada");
  }
};

const getFuncionario = async (event) => {
  const params = {
    TableName: "Funcionarios",
    Key: {
      ID: event.pathParameters.id,
    },
  };

  try {
    const data = await dynamoDB.get(params);
    return sendResponse(200, data);
  } catch (error) {
    return sendResponse(500, "Erro ao buscar o funcionário");
  }
};

const createFuncionario = async (event) => {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: "Funcionarios",
    Item: {
      ID: requestBody.ID,
      Nome: requestBody.Nome,
      Cargo: requestBody.Cargo,
      Idade: requestBody.Idade,
    },
  };

  try {
    await dynamoDB.put(params);
    return sendResponse(200, "Funcionário criado com sucesso");
  } catch (error) {
    return sendResponse(500, "Erro ao criar o funcionário");
  }
};

const updateFuncionario = async (event) => {
  const requestBody = JSON.parse(event.body);

  const params = {
    TableName: "Funcionarios",
    Key: {
      ID: event.pathParameters.id,
    },
    UpdateExpression: "SET Nome = :nome, Cargo = :cargo",
    ExpressionAttributeValues: {
      ":nome": requestBody.Nome,
      ":cargo": requestBody.Cargo,
      ":idade": requestBody.Idade,
    },
  };

  try {
    dynamoDB.update(params);
    return sendResponse(200, "Funcionário atualizado com sucesso");
  } catch (error) {
    return sendResponse(500, "Erro ao atualizar o funcionário");
  }
};

const deleteFuncionario = async (event) => {
  const params = {
    TableName: "Funcionarios",
    Key: {
      ID: event.pathParameters.id,
    },
  };

  try {
    dynamoDB.delete(params);
    return sendResponse(200, "Funcionário deletado com sucesso");
  } catch (error) {
    return sendResponse(500, "Erro ao deletar o funcionário");
  }
};

const sendResponse = (statusCode, message) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
};
