package se.workout.RESTApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import se.workout.RESTApp.domain.Exercise;

/**
 * Created by Jaam on 2017-06-22.
 */
public interface ExerciseRepository extends MongoRepository<Exercise, String>{
    Exercise findById(String exercise);
}
