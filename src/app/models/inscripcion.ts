import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion{
    fecha!: Date;
    fechaFinal!: Date;
    cliente!: DocumentReference;
    precios!: DocumentReference;
    subTotal!: number;
    total!: number;
    constructor(){
        this.fecha = this.fecha;
        this.fechaFinal = this.fecha;
        this.cliente = this.cliente;
        this.precios = this.precios;
        this.subTotal = this.subTotal;
        this.total = this.total;
    }
}