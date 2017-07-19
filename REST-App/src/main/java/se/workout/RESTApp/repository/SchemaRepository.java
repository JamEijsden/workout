package se.workout.RESTApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import se.workout.RESTApp.domain.Schema;

/**
 * Created by Jaam on 2017-06-22.
 */
public interface SchemaRepository extends MongoRepository<Schema, String>{
    Schema findById(String id);
}
