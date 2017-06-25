package se.workout.RESTApp.domain.json;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import se.workout.RESTApp.domain.Exercise;
import se.workout.RESTApp.domain.Group;
import se.workout.RESTApp.domain.Schema;
import se.workout.RESTApp.domain.Session;

/**
 * Created by Jaam on 2017-06-22.
 */
@JsonIgnoreProperties(ignoreUnknown=true)
public class UpdateUser {

    private String userId;
    private String schemaId;
    private String groupId;
    private String exerciseId;
    private Schema schema;
    private Group group;
    private Exercise exercise;
    private Session session;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSchemaId() {
        return schemaId;
    }

    public void setSchemaId(String schemaId) {
        this.schemaId = schemaId;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(String exerciseId) {
        this.exerciseId = exerciseId;
    }

    public Schema getSchema() {
        return schema;
    }

    public void setSchema(Schema schema) {
        this.schema = schema;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public UpdateUser() {
    }

    @Override
    public String toString() {
        return "UpdateUser{" +
                "userId='" + userId + '\'' +
                ", schemaId='" + schemaId + '\'' +
                ", groupId='" + groupId + '\'' +
                ", exerciseId='" + exerciseId + '\'' +
                ", schema=" + schema +
                ", group=" + group +
                ", exercise=" + exercise +
                ", session=" + session +
                '}';
    }
}
