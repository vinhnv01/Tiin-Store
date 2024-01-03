package com.tool;

import com.tiinstore.entity.Category;
import com.tiinstore.repository.CategoryReposiory;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@RequiredArgsConstructor
@EnableJpaRepositories(
        basePackages = "com.tiinstore.repository")
public class DBGenerator implements CommandLineRunner {

    private final CategoryReposiory categoryReposiory;

    @Override
    public void run(String... args) throws Exception {

//        Category category1 = Category.builder().name().build()
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBGenerator.class);
        ctx.close();
    }

}