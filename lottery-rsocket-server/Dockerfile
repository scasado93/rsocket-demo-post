FROM adoptopenjdk/maven-openjdk11 as builder

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src src
RUN mvn package
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM adoptopenjdk/openjdk11:jre-nightly

COPY --from=builder /app/target/dependency/BOOT-INF/lib /app/lib
COPY --from=builder /app/target/dependency/META-INF /app/META-INF
COPY --from=builder /app/target/dependency/BOOT-INF/classes /app

ENTRYPOINT ["java", "-cp", "app:app/lib/*","com.paradigmadigital.lottery.LotteryNumberGeneratorApplication"]