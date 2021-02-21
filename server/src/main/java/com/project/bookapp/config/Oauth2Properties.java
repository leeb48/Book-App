package com.project.bookapp.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "oauth2")
@Data
public class Oauth2Properties {

    private String successUrl;
    private String failureUrl;

}
