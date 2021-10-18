#
# Build in local machine
#
#FROM openjdk:11
#ADD target/capture-backend.jar capture-backend.jar
#ENTRYPOINT ["java", "-jar","capture-backend.jar"]
#EXPOSE 8080

#
# Build stage
#
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM openjdk:11
COPY --from=build /home/app/target/capture-backend.jar capture-backend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","capture-backend.jar"]
