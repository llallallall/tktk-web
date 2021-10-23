import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  constructor(
    updates: SwUpdate,
  ) {
    updates.available.subscribe(event => {      
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      updates.activateUpdate().then(() => document.location.reload());
    });
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
    this.initFireBase();
  }


  initFireBase() {
    const ftag = `initFireBase(),`;
    // Initialize Firebase
    const app = initializeApp(environment.firebaseConfig);
    console.log(ftag, 'app=', app);
    const analytics = getAnalytics(app);
    console.log(ftag, 'analytics=', analytics);
  }

}
