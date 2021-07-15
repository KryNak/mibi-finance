package com.configurations;

import com.properties.DbConnectionProperty;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.h2.H2ConsoleProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
@RequiredArgsConstructor
public class DatabaseConfiguration {

    private final DbConnectionProperty connectionProperty;

    @Bean(name = "dataSource")
    @Profile("Dev")
    public DataSource h2DataSource(){
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url("jdbc:h2:mem:testdb");
        dataSourceBuilder.username("sa");
        dataSourceBuilder.driverClassName("org.h2.Driver");

        return dataSourceBuilder.build();
    }

    @Bean
    @Primary
    @Profile("Dev")
    public H2ConsoleProperties h2ConsoleProperties(){
        H2ConsoleProperties h2ConsoleProperties = new H2ConsoleProperties();
        h2ConsoleProperties.setEnabled(true);
        h2ConsoleProperties.setPath("/console");

        return h2ConsoleProperties;
    }

    @Bean(name = "dataSource")
    @Profile("Prod")
    public DataSource MySqlDataSource(){
        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.url(connectionProperty.getUrl());
        dataSourceBuilder.username(connectionProperty.getUsername());
        dataSourceBuilder.password(connectionProperty.getPassword());
        dataSourceBuilder.driverClassName("com.mysql.jdbc.Driver");

        return dataSourceBuilder.build();
    }

}
