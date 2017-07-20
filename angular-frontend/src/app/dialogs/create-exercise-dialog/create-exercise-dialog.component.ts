import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-exercise-dialog',
  templateUrl: './create-exercise-dialog.component.html',
  styleUrls: ['./create-exercise-dialog.component.css']
})
export class CreateExerciseDialogComponent implements OnInit {
  public sets: number;
  public reps: number;
  public name: string;
  constructor(public dialogRef: MdDialogRef<CreateExerciseDialogComponent>) { }

  ngOnInit() {
  }

}
