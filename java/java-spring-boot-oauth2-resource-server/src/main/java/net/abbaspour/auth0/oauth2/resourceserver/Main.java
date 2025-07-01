package net.abbaspour.auth0.oauth2.resourceserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}