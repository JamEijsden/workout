package se.workout.RESTApp.service;

import se.workout.RESTApp.domain.Exercise;
import se.workout.RESTApp.domain.Group;

/**
 * Created by Jaam on 2017-06-21.
 */
public interface GroupService {

    Group findById(String id);

    Group create(Group group);

    Group addExercise(Group g, Exercise e);

}
