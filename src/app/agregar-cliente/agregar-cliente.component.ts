import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {
formularioCliente!: FormGroup;
porcentajeSubida: number = 0;
urlImg: string = '';
editable: boolean = false;
id!: string;
  constructor(private fb: FormBuilder, 
    private storage: AngularFireStorage, 
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute) { }

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
    this.id = this.activeRoute.snapshot.params.clienteID
    if(this.id != undefined){
      this.editable = true;
      this.db.doc<any>('clientes'+ '/' + this.id).valueChanges().subscribe((cliente)=>{
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          fcNacimiento: new Date(cliente.fcNacimiento.seconds*1000).toISOString().substr(0,10),
          telefono: cliente.telefono,
          img: ''
        })
        this.urlImg = cliente.img;
      })
    }
    
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

  editar(){
    this.formularioCliente.value.img = this.urlImg;
    this.formularioCliente.value.fcNacimiento = new Date(this.formularioCliente.value.fcNacimiento);
    this.formularioCliente.value

    this.db.doc('clientes/'+ this.id).update(this.formularioCliente.value).then((resultado)=>{
      console.log('Se editó correctamente')
    }).catch(()=>{
      console.log('Error!')
    })
  }

}
