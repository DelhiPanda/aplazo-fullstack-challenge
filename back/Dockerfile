# Build Stage
FROM gradle:latest AS build
WORKDIR /usr/app/
COPY . .
RUN gradle build --no-daemon

# Package Stage
FROM openjdk:21-ea-jdk
ENV JAR_NAME=aplazo-0.0.1.jar
ENV APP_HOME=/usr/app
WORKDIR $APP_HOME
COPY --from=BUILD $APP_HOME/build/libs/$JAR_NAME .
EXPOSE 3000
ENTRYPOINT ["java", "-jar", "$APP_HOME/$JAR_NAME"]