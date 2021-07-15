package com.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "com.db-connection")
public class DbConnectionProperty {

    private String username;
    private String password;
    private String url;

}
