package net.abbaspour.auth0.oauth2.resourceserver.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "spring.security.oauth2.resourceserver.jwt")
public class JwtIssuersConfig {

    private List<String> issuers = new ArrayList<>();
    private String audience;

    public List<String> getIssuers() {
        return issuers;
    }

    public void setIssuers(List<String> issuers) {
        this.issuers = issuers;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }
}