package ru.questboat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Created by Mikhail Falaleev on 05.05.2017.
 */

@Configuration
@EnableAsync
@EnableScheduling
public class AppConfig {
}
