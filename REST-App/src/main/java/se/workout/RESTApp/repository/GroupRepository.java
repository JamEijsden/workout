package se.workout.RESTApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import se.workout.RESTApp.domain.Group;

/**
 * Created by Jaam on 2017-06-22.
 */
public interface GroupRepository extends MongoRepository<Group, String>{
    Group findById(String id);
}
