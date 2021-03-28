import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion{
    fecha!: Date;
    fechaFinal!: Date;
    cliente!: DocumentReference;
    precios!: DocumentReference;
    total!: number;
    constructor(){
        this.fecha = null as any;
        this.fechaFinal = this.fecha;
        this.cliente = this.cliente;
        this.precios = this.precios;
        this.total = null as any;
    }
    validar(): any{
        let respuesta = {
            esValido: false,
            mensaje: ''
        }
        if(this.cliente == null || this.cliente == undefined){
            respuesta.esValido= false;
            respuesta.mensaje = 'Seleccione un cliente'
            return respuesta;
        }
        if(this.precios == null || this.precios == undefined){
            respuesta.esValido= false;
            respuesta.mensaje = 'No ha seleccionado un tipo'
            return respuesta;
        }
        if(this.fecha == null || this.fecha == undefined){
            respuesta.esValido= false;
            respuesta.mensaje = 'No tiene fecha de inicio'
            return respuesta;
        }

        if(this.fechaFinal == null || this.fechaFinal == undefined){
            respuesta.esValido= false;
            respuesta.mensaje = 'No tiene fecha final'
            return respuesta;
        }
        
        if(this.total <= 0 || this.total == undefined){
            respuesta.esValido= false;
            respuesta.mensaje = 'No se ha podido calcular el total'
            return respuesta;
        }
        respuesta.esValido = true;
        return respuesta;
    }
}