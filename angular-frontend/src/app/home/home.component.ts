import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import {Schema} from '../classes/schema';
import {SchemaDataService} from '../services/schema-data.service';
import {UserDataService} from '../services/user-data.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('cardContent', [
      state('shown', style({
        height: '*',
        opacity: 1
      })),
      state('hidden', style({
        height: '0',
        opacity: 0
      })),
      transition('shown => hidden', animate('400ms ease-in-out')),
      transition('hidden => shown', animate('400ms ease-in-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  schemaVisibility = [];
  colors = ['lightblue', 'lightgreen', 'lightpink', '#DDBDF!'];
  schemas: Schema[] = [];

  constructor(public auth: AuthService, private schemaService: SchemaDataService, private userService: UserDataService) {
  }

  public showSelected($event, index) {
    let i = 0;
    this.schemaVisibility[index].schemaId = this.toggleVisibility(this.schemaVisibility[index].schemaId);
    for (const schema of this.schemaVisibility){
      if (i != index ) {
        schema.schemaId = 'hidden';
      }
      i++;
    }
  }

  toggleVisibility(visibility) {
    return (visibility == 'shown') ? 'hidden' : 'shown';
  }

  public alternateColorList(value) {
    return this.colors[value % this.colors.length];
  }

  ngOnInit() {
    this.schemaService.getCurrentUserSchemas()
      .subscribe(data => {
        this.schemas = data as Schema[];
        for (const schema of this.schemas){
          const schemaId = schema.id;
          this.schemaVisibility.push(
            {
              schemaId: 'hidden'
            }
          );
        }
      }, error => {
        console.log(JSON.stringify(error.json))
      });

  }

}
