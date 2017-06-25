package se.workout.RESTApp;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import se.workout.RESTApp.util.CorsFilter;
import se.workout.RESTApp.util.JWTAuthenticationFilter;
import se.workout.RESTApp.util.JWTLoginFilter;


/**
 * Created by Jaam on 2017-06-21.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests()
                //.antMatchers("/controller").permitAll()
                .antMatchers(HttpMethod.POST, "/api/token").permitAll()
                .anyRequest().authenticated()
                .and()
                // We filter the controller/login requests
                .addFilterBefore(new JWTLoginFilter("/api/token", authenticationManager()),
                        UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of JWT in header
                .addFilterBefore(new JWTAuthenticationFilter(),
                        UsernamePasswordAuthenticationFilter.class)
                //Add CORS Preflight
                .addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Create a default account
        auth.inMemoryAuthentication()
                .withUser("jimmie")
                .password("Katat0nia")
                .roles("ADMIN");
    }
}
