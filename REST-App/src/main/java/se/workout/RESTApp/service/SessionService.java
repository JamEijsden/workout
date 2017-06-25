package se.workout.RESTApp.service;

import se.workout.RESTApp.domain.Session;

/**
 * Created by Jaam on 2017-06-21.
 */
public interface SessionService {

    Session findById(String id);

    Session create(Session session);

}
