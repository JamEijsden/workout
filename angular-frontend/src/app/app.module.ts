import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdSidenavModule, MdGridListModule,
        MdToolbarModule, MdIconModule, MdListModule, MdCardModule, MdMenuModule,
        MdSnackBarModule, MdDialogModule, MdInputModule, MdButtonToggleModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ROUTES } from './app.routes';

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { SchemaComponent } from './schema/schema.component';
import {UserService} from 'app/services/user.service';
import { CreateSchemaDialogComponent } from './dialogs/create-schema-dialog/create-schema-dialog.component';
import {SchemaService} from './services/schema.service';
import {CookieService} from './services/cookie.service';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth-guard';
import {GroupService} from './services/group.service';
import { GroupComponent } from './group/view/group.component';
import {CreateExerciseDialogComponent} from "./dialogs/create-exercise-dialog/create-exercise-dialog.component";
import {ExerciseService} from "app/services/exercise.service";
import {EditGroupComponent} from "./group/edit/edit.group.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CallbackComponent,
    NavigationComponent,
    AuthComponent,
    AboutComponent,
    SchemaComponent,
    CreateSchemaDialogComponent,
    CreateExerciseDialogComponent,
    GroupComponent,
    EditGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdGridListModule,
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdCardModule,
    MdMenuModule,
    MdSnackBarModule,
    MdDialogModule,
    MdInputModule,
    MdButtonToggleModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  entryComponents: [CreateSchemaDialogComponent, CreateExerciseDialogComponent],
  providers: [AuthService, UserService, SchemaService, GroupService, ExerciseService, CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
