package se.workout.RESTApp;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import se.workout.RESTApp.service.*;

/**
 * Created by Jaam on 2017-06-21.
 */

@Configuration
public class AppConfig {

    @Bean
    public UserService userService(){
        return new UserServiceImpl();
    }

    @Bean
    public SchemaService schemaService(){
        return new SchemaServiceImpl();
    }

    @Bean
    public GroupService groupService(){
        return new GroupServiceImpl();
    }

}
