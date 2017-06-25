package se.workout.RESTApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import se.workout.RESTApp.domain.User;

import java.util.List;

/**
 * Created by Jaam on 2017-06-21.
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    public User findByEmail(String email);
    public List<User> findByLastname(String lastname);
    public User findById(String id);
    public List<User> findAll();

}
