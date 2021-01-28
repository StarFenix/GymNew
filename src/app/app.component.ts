import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GymNew';

  constructor(public auth: AngularFireAuth){
    this.auth.user.subscribe((usuario)=>{
      console.log(usuario)
    })
  }
  login() {
    this.auth.signInWithEmailAndPassword("starfenix66@gmail.com", "123456789")
  }
  logout() {
    this.auth.signOut();
  }
}
