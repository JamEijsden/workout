package se.workout.RESTApp.service;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import se.workout.RESTApp.domain.Schema;
import se.workout.RESTApp.domain.User;
import se.workout.RESTApp.repository.UserRepository;

import java.util.List;

/**
 * Created by Jaam on 2017-06-21.
 */
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public UserServiceImpl() {
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> findByLastname(String lastname) {
        return userRepository.findByLastname(lastname);
    }

    @Override
    public User findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User create(User user) {
        return userRepository.save(user);
    }

    @Override
    public User addSchema(User user, Schema schema) {
        user.getSchemas().add(schema);
        return userRepository.save(user);
    }

    @Override
    public void removeSchema(String sid) {
        //Query searchQuery = new Query(Criteria.where("id").is(sid));
        //mongoTemplate.remove(searchQuery, Schema.class);
        mongoTemplate.updateMulti(new Query(), new Update().pull("schemas", Query.query(Criteria.where("$id").is(new ObjectId(sid)))), User.class);
    }
}
