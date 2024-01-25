instalar dependencias:
npm install

Rodar os métodos do serverless:
serverless invoke local --function handler --path requests/createFuncionario.json
serverless invoke local --function handler --path requests/getFuncionario.json
serverless invoke local --function handler --path requests/updateFuncionario.json
serverless invoke local --function handler --path requests/deleteFuncionario.json

rodar os testes unitários:
npm test
