import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CallbackComponent } from './callback/callback.component';
import {SchemaComponent} from './schema/schema.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth-guard';
import {GroupComponent} from './group/view/group.component';
import {EditGroupComponent} from "./group/edit/edit.group.component";

export const ROUTES: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'edit/schema', component: SchemaComponent },
      { path: 'edit/group/:id', component: EditGroupComponent },
      { path: 'group/:id', component: GroupComponent },
      { path: 'callback', component: CallbackComponent},
      { path: '**', redirectTo: '' }
    ]
  }
];
