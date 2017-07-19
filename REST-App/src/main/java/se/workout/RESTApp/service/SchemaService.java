package se.workout.RESTApp.service;

import se.workout.RESTApp.domain.Group;
import se.workout.RESTApp.domain.Schema;

/**
 * Created by Jaam on 2017-06-21.
 */
public interface SchemaService {

    Schema findById(String id);

    Schema create(Schema schema);

    void delete(String id);

    Schema addGroup(Schema s, Group g);


}
