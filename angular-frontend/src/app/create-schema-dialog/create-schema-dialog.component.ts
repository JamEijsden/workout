import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-schema-dialog',
  templateUrl: './create-schema-dialog.component.html',
  styleUrls: ['./create-schema-dialog.component.css']
})
export class CreateSchemaDialogComponent implements OnInit {
  id: string;
  initName: string;
  initDesc: string;
  rated: number;
  constructor(public dialogRef: MdDialogRef<CreateSchemaDialogComponent>) { }

  ngOnInit() {
  }

}
