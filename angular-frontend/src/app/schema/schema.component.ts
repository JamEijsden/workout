import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../classes/user';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {CreateSchemaDialogComponent} from '../dialogs/create-schema-dialog/create-schema-dialog.component';
import {DOCUMENT} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {SchemaService} from '../services/schema.service';
import {Schema} from '../classes/schema';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GroupService} from '../services/group.service';


@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css'],
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
export class SchemaComponent implements OnInit {
  users: User[];
  schemas: Schema[];
  visibleGroups = [];
  schemaVisibility = [];
  newGroupName = '';
  private showCustomer: String = 'hidden';
  dialogRef: MdDialogRef<CreateSchemaDialogComponent>;
  selectedSchema = null;
  colors = ['lightblue', 'lightgreen', 'lightpink', '#DDBDF!'];

  constructor(public auth: AuthService, public userService: UserService,
              public dialog: MdDialog, @Inject(DOCUMENT) doc: any, private router: Router,
              private schemaService: SchemaService,  public snackBar: MdSnackBar,
              private groupService: GroupService) {

    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });

    dialog.afterAllClosed.subscribe(() => {
      doc.body.classList.remove('no-scroll');
    });


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

  goToEditGroupView(groupId) {
    console.log(groupId);
    this.router.navigate(['edit/group', groupId]);
  }

  public deleteSchema(schema) {
    this.schemaService.deleteSchemaById(schema.id)
      .subscribe(data => {
        this.popSchemaFromArray(schema);
        this.openSnackbar('Schema was successfully deleted');
      }, error => {
        console.log(error);
        console.log(JSON.stringify(error.json));
      });
  }
  public copySchema(schema: Schema) {
    const new_schema = new Schema();
    new_schema.name = schema.name + '_copy';
    new_schema.description = schema.description;
    new_schema.groups = schema.groups;
    this.schemaVisibility.push({shemaid: 'hidden'});
    delete new_schema.id;
    this.schemaService.addSchema(new_schema)
      .subscribe(data => {
        this.openSnackbar('Schema was successfully copied');
        console.log(data);
        this.schemas.push(data);
      });
  }

  public alternateColorList(value) {
    return this.colors[value % this.colors.length];
  }

  openCreateSchemaModal() {
    this.dialogRef = this.dialog.open(CreateSchemaDialogComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      this.schemaVisibility.push({schemaId: 'hidden'});
      if (result != null) {
        this.schemaService.addSchema(result)
          .subscribe(data => {
            this.openSnackbar('Schema was successfully created');
            console.log(data);
            this.schemas.push(data);
          });
        this.dialogRef = null;
      }
    });
  }

  openEditSchemaModal(schema: Schema) {
    this.dialogRef = this.dialog.open(CreateSchemaDialogComponent);
    this.dialogRef.componentInstance.initName = schema.name;
    this.dialogRef.componentInstance.initDesc = schema.description;
    this.dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        schema.name = result.name;
        schema.description = result.description;
        this.schemaService.editSchema(schema)
          .subscribe(data => {
            this.openSnackbar('Schema was successfully updated');
            console.log(data);
          });
        this.dialogRef = null;
      }
    });
  }

  popSchemaFromArray(schema) {
    const index = this.schemas.indexOf(schema);
    console.log(index, this.schemas);
    if (index !== -1) {
      this.schemas.splice(index, 1);
    }


  }

  addGroup($event, name, sid) {
    this.newGroupName = '';

    this.groupService.addGroup(name, sid)
      .subscribe(
        data => {
          console.log(data);
          this.visibleGroups.push(data);
          this.openSnackbar('Group was successfully created');
        }, error => {
          console.log(error);
    });
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

  openSnackbar(msg: string) {
    this.snackBar.open(msg, 'Dismiss', {
      duration: 2000,
    });
  }

}
