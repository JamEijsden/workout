import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import {Schema} from "../classes/schema";
import {SchemaDataService} from "../services/schema-data.service";
import {UserDataService} from "../services/user-data.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  colors = ['lightblue', 'lightgreen', 'lightpink', '#DDBDF!'];
  schemas: Schema[] = [];

  constructor(public auth: AuthService, private schemaService: SchemaDataService, private userService: UserDataService) {
  }

  public alternateColorList(value) {
    return this.colors[value % this.colors.length];
  }

  ngOnInit() {
    this.schemaService.getCurrentUserSchemas()
      .subscribe(data => {
        this.schemas = data as Schema[];
      }, error => {
        console.log(JSON.stringify(error.json))
      });

  }

}
