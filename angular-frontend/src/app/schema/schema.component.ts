import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {UserDataService} from '../services/user-data.service';
import {User} from '../classes/user';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {CreateSchemaDialogComponent} from '../create-schema-dialog/create-schema-dialog.component';
import {DOCUMENT} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {SchemaDataService} from '../services/schema-data.service';
import {Schema} from '../classes/schema';
import {animate, state, style, transition, trigger} from "@angular/animations";

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
  schemaVisibility = [];
  private showCustomer: String = 'hidden';
  dialogRef: MdDialogRef<CreateSchemaDialogComponent>;
  selectedSchema = null;

  constructor(public auth: AuthService, public userService: UserDataService,
              public dialog: MdDialog, @Inject(DOCUMENT) doc: any, private router: Router,
              private schemaService: SchemaDataService,  public snackBar: MdSnackBar) {

    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });

    dialog.afterAllClosed.subscribe(() => {
      doc.body.classList.remove('no-scroll');
    });


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
  public copySchema(schema) {
    const new_schema = JSON.parse(JSON.stringify(schema));
    new_schema.name = new_schema.name + '_copy';
    delete new_schema.id;
    this.schemaService.addSchema(new_schema)
      .subscribe(data => {
        this.openSnackbar('Schema was successfully copied');
        console.log(data);
        this.schemas.push(data);
      });
  }
  public alternateColorList(value) {
    if ((value % 2) === 1)
      return 'lightgrey';
    else return 'white';
  }

  openModal() {
    this.dialogRef = this.dialog.open(CreateSchemaDialogComponent);

    this.dialogRef.afterClosed().subscribe(result => {
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

  popSchemaFromArray(schema) {
    const index = this.schemas.indexOf(schema);
    console.log(index, this.schemas);
    if (index !== -1) {
      this.schemas.splice(index, 1);
    }


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

    this.userService.getAllUsers()
      .subscribe(data => {
        this.users = data as User[];
    }, error => {
      console.log(JSON.stringify(error.json()));
    });
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg, 'Dismiss', {
      duration: 2000,
    });
  }

}
