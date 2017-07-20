import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../services/group.service';
import {CreateExerciseDialogComponent} from '../../dialogs/create-exercise-dialog/create-exercise-dialog.component';
import {MdDialog, MdDialogRef} from "@angular/material";
import {Exercise} from '../../classes/exercise';
import {ExerciseService} from '../../services/exercise.service';

@Component({
  selector: 'app-group',
  templateUrl: './edit.group.component.html',
  styleUrls: ['./edit.group.component.css']
})
export class EditGroupComponent implements OnInit, OnDestroy {
  id: string;
  title: string;
  exercises: Exercise[] = [];
  dialogRef: MdDialogRef<CreateExerciseDialogComponent>;
  private sub: any;
  constructor(public dialog: MdDialog, private route: ActivatedRoute, private groupService: GroupService,
              private exerciseService: ExerciseService) { }

  openCreateExerciseModal() {
    this.dialogRef = this.dialog.open(CreateExerciseDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.exerciseService.addExercise(result as Exercise, this.id)
          .subscribe(data => {
            console.log(data);
            this.exercises.push(data);
          });
        this.dialogRef = null;
      }
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.groupService.getGroupById(this.id)
        .subscribe(
          data => {
            console.log();
            this.title = data.name;
            this.exercises = data.exercises;
          }, error => {
            console.log();
          }
        )
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
