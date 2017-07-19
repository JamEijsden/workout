import {Component, OnDestroy, OnInit} from '@angular/core';
import { GLOBAL } from './global.variables';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  _subscription: any;

  picture = localStorage.getItem('picture');
  constructor(public auth: AuthService)  {
    this._subscription = auth.picture.subscribe((value) => {
      this.picture = value;
    });
    auth.handleAuthentication();
  }

  ngOnDestroy() {
    //prevent memory leak when component destroyed
    this._subscription.unsubscribe();
  }

  ngOnInit() {
  }


}
