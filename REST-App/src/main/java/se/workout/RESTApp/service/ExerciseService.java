package se.workout.RESTApp.service;

import se.workout.RESTApp.domain.Exercise;

/**
 * Created by Jaam on 2017-06-21.
 */
public interface ExerciseService {

    Exercise findById(String id);

    Exercise create(Exercise exercise);

}
