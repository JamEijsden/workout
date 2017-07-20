package se.workout.RESTApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import se.workout.RESTApp.domain.Exercise;
import se.workout.RESTApp.domain.Group;
import se.workout.RESTApp.repository.GroupRepository;

/**
 * Created by Jaam on 2017-06-21.
 */
public class GroupServiceImpl implements GroupService {

    @Autowired
    GroupRepository groupRepository;

    public GroupServiceImpl() {
    }

    @Override
    public Group findById(String id) {
        return groupRepository.findById(id);
    }

    @Override
    public Group create(Group group) {
        return groupRepository.save(group);
    }

    @Override
    public Group addExercise(Group g, Exercise e) {
        g.getExercises().add(e);
        return groupRepository.save(g);
    }
}
