# Multi-stage build for java-minimal-jetty
# 1) Build the WAR with Maven
FROM maven:3.9.8-eclipse-temurin-11 AS builder
WORKDIR /workspace
# Copy module sources (build context is the module directory)
COPY . .
# Build the module
RUN mvn -B -DskipTests package

# 2) Runtime: Jetty on Java 11
# Using a Jetty 9.4 image compatible with Servlet 3.1 and Java 11
FROM jetty:9.4.50-jre11

# Ensure Jetty binds to the port provided by the platform (e.g. Render sets $PORT)
# Jetty honors standard JVM system property jetty.http.port
ENV JAVA_OPTIONS="-Djetty.http.port=$PORT"

# Deploy the app as the ROOT context
# Copy built WAR from the builder stage into Jetty webapps directory
COPY --from=builder /workspace/target/java-minimal-jetty-*.war /var/lib/jetty/webapps/ROOT.war

# Expose default port (Render will set PORT env var). This is informational only.
EXPOSE 8080

# Jetty base image provides the default CMD to start the server