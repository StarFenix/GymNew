import { Component, OnInit } from '@angular/core';
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
  constructor(private fb: FormBuilder, private storage: AngularFireStorage) { }

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
    console.log(this.formularioCliente.value)
  }

  subirImagen(evento: any){
    let nombre = new Date().getTime().toString()
    let file = evento.target.files[0]
    let extension = file.name.toString().substring(file.name.toString().lastIndexOf('.'))
    let ruta = 'clientes/' + nombre + extension;
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(file)
    tarea.then((objeto)=>{
      console.log('Subida')
      referencia.getDownloadURL().subscribe((url)=>{
        console.log(url)
    })
    })
    tarea.percentageChanges().subscribe((porcentaje)=>{
      this.porcentajeSubida = parseInt(porcentaje!.toString())
    })
  }

}
