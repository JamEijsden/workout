package se.workout.RESTApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import se.workout.RESTApp.domain.Session;

/**
 * Created by Jaam on 2017-06-22.
 */
public interface SessionRepository extends MongoRepository<Session, String>{
    Session findById(String id);
}
