import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  isCollapse = true;   // guardamos el valor
    toggleState() { // manejador del evento
        let foo = this.isCollapse;
        this.isCollapse = foo === false ? true : false; 
    }
  usuario!: firebase.User
  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
   
  }
  logout() {
    this.auth.signOut();
  }
}
