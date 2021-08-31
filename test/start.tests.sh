docker build -t mindbridge_backend -f .docker/backend.Dockerfile .

docker-compose -f .docker/docker-compose.tests.yml up -d

bash ./test/scripts/wait.sh

cd test && npm install && npm run test:api
