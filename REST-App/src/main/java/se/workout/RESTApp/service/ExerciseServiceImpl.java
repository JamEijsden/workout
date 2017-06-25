package se.workout.RESTApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import se.workout.RESTApp.domain.Exercise;
import se.workout.RESTApp.repository.ExerciseRepository;

/**
 * Created by Jaam on 2017-06-21.
 */
public class ExerciseServiceImpl implements ExerciseService {

    @Autowired
    ExerciseRepository exerciseRepository;

    public ExerciseServiceImpl() {
    }

    @Override
    public Exercise findById(String id) {
        return exerciseRepository.findById(id);
    }

    @Override
    public Exercise create(Exercise exercise) {
        return exerciseRepository.save(exercise);
    }
}
