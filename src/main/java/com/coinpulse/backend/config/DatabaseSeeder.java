package com.coinpulse.backend.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Runs data.sql once the application context (and the Hibernate-generated schema)
 * is fully up. Spring Boot's built-in script initialization is disabled
 * (spring.sql.init.mode=never) because it runs before Hibernate creates the schema.
 * The same seeding is reused by POST /api/test/reset.
 */
@Component
public class DatabaseSeeder implements ApplicationRunner {

    private final DataSource dataSource;

    public DatabaseSeeder(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        seed();
    }

    public void seed() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(connection, new ClassPathResource("data.sql"));
        }
    }
}
