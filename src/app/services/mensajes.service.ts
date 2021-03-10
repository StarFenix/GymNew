import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  correcto(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success'
    })
  }

  advertencia(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning'
    })
  }

  error(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error'
    })
  }
}
