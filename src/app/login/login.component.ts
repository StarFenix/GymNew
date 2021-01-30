import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin!: FormGroup;
  datosCorrectos: boolean = true;
  textoError: string = '';
  constructor(public creadorFormulario: FormBuilder, public auth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.formulario();
  }
  formulario(){
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    });
  }
  ingresar()
  {
    if(this.formularioLogin.valid){
      this.datosCorrectos = true;
      this.spinner.show();
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((usuario)=>{
        console.log(usuario)
        this.spinner.hide();
      }).catch((error)=>{
        this.datosCorrectos = false;
        this.textoError = error.message;
        this.spinner.hide();
      })
    }
    else{
      this.textoError = 'Verifique que los datos ingresados sean correctos'
      this.datosCorrectos = false;
    }
  }
}
