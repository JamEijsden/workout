import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CallbackComponent } from './callback/callback.component';
import {SchemaComponent} from "./schema/schema.component";

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'schema', component: SchemaComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];
