import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../../services/group.service';
import {CreateExerciseDialogComponent} from '../../dialogs/create-exercise-dialog/create-exercise-dialog.component';
import {MdDialog, MdDialogRef} from "@angular/material";
import {Exercise} from '../../classes/exercise';
import {ExerciseService} from '../../services/exercise.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  id: string;
  title: string;
  exersices: any;
  dialogRef: MdDialogRef<CreateExerciseDialogComponent>;
  private sub: any;
  constructor(public dialog: MdDialog, private route: ActivatedRoute, private groupService: GroupService,
              private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.groupService.getGroupById(this.id)
        .subscribe(
          data => {
            console.log(data);
            this.title = data.name;
          }, error => {
            console.log(error);
          }
        )
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
