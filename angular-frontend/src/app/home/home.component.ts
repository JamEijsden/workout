import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import {Schema} from '../classes/schema';
import {SchemaService} from '../services/schema.service';
import {UserService} from '../services/user.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GroupService} from '../services/group.service';
import {Router} from '@angular/router';


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
  visibleGroups = [];
  colors = ['lightblue', 'lightgreen', 'lightpink', '#DDBDF!'];
  schemas: Schema[] = [];

  constructor(public auth: AuthService, private schemaService: SchemaService, private userService: UserService,
              private groupService: GroupService, private router: Router) {
  }

  goToGroupView(groupId) {
    this.router.navigate(['group', groupId]);
  }

  public showSelected($event, index, id) {
    let i = 0;

    for (const schema of this.schemaVisibility){
      if (i != index ) {
        schema.schemaId = 'hidden';
      }
      i++;
    }
    this.groupService.getGroupsBySchema(id)
      .subscribe(
        data => {
          this.schemaVisibility[index].schemaId = this.toggleVisibility(this.schemaVisibility[index].schemaId);
          if (this.schemaVisibility[index].schemaId != 'hidden')
            this.visibleGroups = data;
        }, error => {
          console.log(error);
        }
      );
    if ( this.schemaVisibility[index].schemaId == 'hidden'){
      this.visibleGroups = [];
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
