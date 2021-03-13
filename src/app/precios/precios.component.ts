import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '../models/precio';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio!: FormGroup;
  precios: Precio[] = new Array<Precio>();
  esEditar: boolean = false;
  id: string = '';
  constructor(private fb: FormBuilder, private db: AngularFirestore, private msj: MensajesService) { }

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })
    this.mostrarPrecios()
  }
  agregar(){
    this.db.collection<Precio>('precios').add(this.formularioPrecio.value).then(()=>{
      this.msj.correcto('Agregado', 'Se agregó correctamente')
      this.formularioPrecio.reset()
      this.mostrarPrecios()
    }).catch(()=>{
      this.msj.error('Error', 'Ha ocurrido un error')
    })
    console.log(this.formularioPrecio.value)
  }

  mostrarPrecios(){
    this.db.collection<Precio>('precios').get().subscribe((resultado)=>{
      this.precios.length = 0;
      resultado.docs.forEach((dato)=>{
        let precio = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio)
      })      
    })
  }

  editarPrecio(precio: Precio){
    this.esEditar = true
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo, 
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.id = precio.id;
  }
  editar(){
    this.db.doc('precios/' + this.id).update(this.formularioPrecio.value).then(()=>{
      this.msj.correcto('Editado', 'Se editó correctamente')
      this.formularioPrecio.reset()
      this.esEditar = false
      this.mostrarPrecios()
  }).catch(()=>{
      this.msj.error('Error', 'Ocurrió un error')
    })
  }

}
