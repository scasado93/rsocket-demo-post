# Lottery RSocket Server

## Run the application - for Development

Execute the following command. You can use the maven wrapper or 
your own maven installation. 

```bash
./mvnw spring-boot:run
```

## Run the application - Docker mode

The project contains a Dockerfile file which can be used to launch 
the application in a Docker environment.

1. Build the image:

```bash
docker build -t lottery-game:v1 .
```

2. Run the container:

```bash
docker run -d -p 8081:8081 --name lottery-game lottery-game:v1
```
