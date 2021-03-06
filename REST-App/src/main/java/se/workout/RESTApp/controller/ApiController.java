package se.workout.RESTApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import se.workout.RESTApp.domain.Schema;
import se.workout.RESTApp.domain.User;
import se.workout.RESTApp.domain.json.UpdateUser;
import se.workout.RESTApp.service.SchemaService;
import se.workout.RESTApp.service.UserService;
import se.workout.RESTApp.util.CustomErrorType;

import java.util.List;


/*
 * Created by Jaam on 2017-06-21.
 */

@RestController

@RequestMapping("/api")
public class ApiController {

    @Autowired UserService userService;
    @Autowired SchemaService schemaService;

    @RequestMapping(value="/user/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") String id) {
        User u = userService.findById(id);
        if(u != null)
            return new ResponseEntity<>(u, HttpStatus.OK);
        else
            return new ResponseEntity<>(new CustomErrorType("No user with id " +  id + "."), HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value="/user/all", method = RequestMethod.GET)
    public ResponseEntity<?> getUser() {
        List<User> users = userService.findAll();
        /*if(!users.isEmpty())*/
            return new ResponseEntity<>(users, HttpStatus.OK);
      /*  else
            return new ResponseEntity<>(new CustomErrorType("No users exists"), HttpStatus.NO_CONTENT);*/
    }

    @RequestMapping(value="/user", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user){
        User u;
        try{
            u = userService.create(user);
        }catch(Exception e){
            u = userService.findByEmail(user.getEmail());
        }
        return new ResponseEntity<>(u, HttpStatus.CREATED);
    }

    @RequestMapping(value="/schema", method = RequestMethod.POST)
    public ResponseEntity<?> createSchema(@RequestBody UpdateUser uu){
        Schema s;
        User u = userService.findById(uu.getUserId());

        s = schemaService.create(uu.getSchema());
        userService.addSchema(u, s);

        return new ResponseEntity<>(s, HttpStatus.CREATED);
    }

    @RequestMapping(value="/user/schema/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserSchemas(@PathVariable("id") String id){
        User u = userService.findById(id);
        return new ResponseEntity<>(u.getSchemas(), HttpStatus.CREATED);
    }

    @RequestMapping(value="/schema/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getSchema(@PathVariable("id") String id){
        Schema s = schemaService.findById(id);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }

    @RequestMapping(value="/schema/{sid}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteSchema(@PathVariable("sid") String sid){
        schemaService.delete(sid);
        userService.removeSchema(sid);
        return new ResponseEntity<CustomErrorType>(new CustomErrorType("Successfully deleted schema"), HttpStatus.OK);
    }

    @SuppressWarnings("serial")
    @ResponseStatus( value = HttpStatus.BAD_REQUEST )
    public class BadRequestException extends RuntimeException{
        public BadRequestException(List<ObjectError> list) {
        }
    }

    @SuppressWarnings("serial")
    @ResponseStatus( value = HttpStatus.NOT_FOUND )
    public class ResourceNotFoundException extends RuntimeException{
        public ResourceNotFoundException(List<ObjectError> list) {
        }
    }
}
