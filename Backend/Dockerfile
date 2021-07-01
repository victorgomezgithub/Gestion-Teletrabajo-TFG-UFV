FROM adoptopenjdk/openjdk11:latest

ARG JAR_FILE=./Gestion-Teletrabajo-TFG-UFV-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "/app.jar"]