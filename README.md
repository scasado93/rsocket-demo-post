# Lottery Game with RSocket 

Lottery Game application made with :heart: and RSocket

## Description
This project is based on two modules:

1. Lottery RSocket Client. It's an **_Angular_** application. It's in charge of requesting the numbers from the server and representing them on the website.
  
2. Lottery RSocket Server. It's an **_Spring Boot_** application. It's in charge of communicating with the client, for the generation and transmission of the winning lottery numbers.

## Run the application (with Docker)
To run the application, you can use Docker. The **_docker-compose.yml_** file contains the two services above. 

Execute the following command to launch the game:
```bash
docker-compose up -d
```

Once the services are up, you can access the game by entering the following URL in the browser:
http://localhost:80

## Game configuration
The server application allows some configuration by the user. You can configure the range of numbers for the raffle, both the main numbers and the special numbers. To do that, you should use the following environment variables in the _lottery-server_ service.

```
environment:
- LOTTERY_NUMBERS_MAIN_MIN = 1
- LOTTERY_NUMBERS_MAIN_MAX = 50
- LOTTERY_NUMBERS_SPECIAL_MIN = 1
- LOTTERY_NUMBERS_SPECIAL_MAX = 12
```