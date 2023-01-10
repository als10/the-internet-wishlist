if [ "$1" == "production" ]
then
  docker-compose -f docker-compose.production.yml --env-file .env.production.local up --build -d
else
  docker-compose --env-file .env.development.local up -d
fi
