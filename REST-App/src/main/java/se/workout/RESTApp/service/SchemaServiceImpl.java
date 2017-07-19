package se.workout.RESTApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import se.workout.RESTApp.domain.Group;
import se.workout.RESTApp.domain.Schema;
import se.workout.RESTApp.repository.SchemaRepository;

/**
 * Created by Jaam on 2017-06-21.
 */
public class SchemaServiceImpl implements SchemaService {

    @Autowired
    SchemaRepository schemaRepository;

    public SchemaServiceImpl() {
    }

    @Override
    public Schema findById(String id) {
        return schemaRepository.findById(id);
    }

    @Override
    public Schema create(Schema schema) {
        return schemaRepository.save(schema);
    }

    @Override
    public void delete(String id) {
        schemaRepository.delete(id);
    }

    @Override
    public Schema addGroup(Schema s, Group g) {
        s.getGroups().add(g);
        return schemaRepository.save(s);
    }
}
