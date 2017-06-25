package se.workout.RESTApp.service;

import se.workout.RESTApp.domain.Schema;
import se.workout.RESTApp.domain.User;

import java.util.List;

/**
 * Created by Jaam on 2017-06-21.
 */
public interface UserService {
    User findByEmail(String email);
    List<User> findByLastname(String lastname);
    User findById(String id);
    List<User> findAll();
    User create(User user);
    User addSchema(User user, Schema schema);
    void removeSchema(String sid);
}
