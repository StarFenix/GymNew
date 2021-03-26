import { DocumentReference } from "@angular/fire/firestore";

export class Inscripcion{
    fecha!: Date;
    fechaFinal!: Date;
    cliente!: DocumentReference;
    precios!: DocumentReference;
    subTotal!: number;
    total!: number;
    constructor(){
        this.fecha = null as any;
        this.fechaFinal = this.fecha;
        this.cliente = this.cliente;
        this.precios = this.precios;
        this.subTotal = null as any;
        this.total = this.total;
    }
}