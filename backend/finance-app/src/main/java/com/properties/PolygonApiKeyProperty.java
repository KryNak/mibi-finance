package com.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "com.polygon")
@Data
public class PolygonApiKeyProperty {

    private String apiKey;

}
