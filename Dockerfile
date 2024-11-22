# Étape 1 : Utiliser une image Maven pour la compilation
FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

COPY pom.xml . 
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /app
COPY .env .env
COPY --from=build /app/target/dream-habitat-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
