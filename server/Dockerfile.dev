FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY ./target/book-app.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]