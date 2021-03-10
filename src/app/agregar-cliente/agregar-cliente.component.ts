import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
formularioCliente!: FormGroup;
porcentajeSubida: number = 0;
urlImg: string = '';
  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      fcNacimiento: ['', Validators.required],
      telefono: [''],
      img: ['', Validators.required]
    })
  }

  agregar(){
    this.formularioCliente.value.img = this.urlImg;
    this.formularioCliente.value.fcNacimiento = new Date(this.formularioCliente.value.fcNacimiento)
    console.log(this.formularioCliente.value)
    this.db.collection('clientes').add(this.formularioCliente.value).then((termino)=>{
      console.log('Creado')
    })
  }

  subirImagen(evento: any){
    if(evento.target.files.length > 0){
      let nombre = new Date().getTime().toString()
      let file = evento.target.files[0]
      let extension = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
      let ruta = 'clientes/' + nombre + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(file)
      tarea.then((objeto)=>{
        console.log('Subida')
        referencia.getDownloadURL().subscribe((url)=>{
          this.urlImg = url;
        })
      })
      tarea.percentageChanges().subscribe((porcentaje)=>{
        this.porcentajeSubida = parseInt(porcentaje!.toString())
      })
    }
    
  }

}
