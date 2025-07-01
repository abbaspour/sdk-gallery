package net.abbaspour.auth0.oauth2.resourceserver.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.oauth2.server.resource.authentication.JwtIssuerAuthenticationManagerResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST"));
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("Authorization");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        // Get issuers from configuration
        List<String> issuers = jwtIssuersConfig.getIssuers();

        // If no issuers are configured, use the default one
        if (issuers == null || issuers.isEmpty()) {
            issuers = Collections.singletonList("https://login.jobs.authlab.work/");
        }

        // A map to hold the AuthenticationManagers for each issuer
        Map<String, AuthenticationManager> authenticationManagers = new ConcurrentHashMap<>();

        for (String issuer : issuers) {
            authenticationManagers.put(issuer, new JwtAuthenticationProvider(JwtDecoders.fromOidcIssuerLocation(issuer))::authenticate);
        }

        JwtIssuerAuthenticationManagerResolver authenticationManagerResolver = new JwtIssuerAuthenticationManagerResolver(authenticationManagers::get);

        http
                .cors()
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .authenticationManagerResolver(authenticationManagerResolver)
                );

        return http.build();
    }

    private final JwtIssuersConfig jwtIssuersConfig;

    public SecurityConfig(JwtIssuersConfig jwtIssuersConfig) {
        this.jwtIssuersConfig = jwtIssuersConfig;
    }

}
