import { DocumentReference } from "@angular/fire/firestore";

export class Cliente{
    id!: string;
    nombre!: string;
    apellido!: string;
    email!: string;
    fcNacimiento!: Date;
    img!: string;
    telefono!: number;
    ref!: DocumentReference;
    visible!: boolean;
    constructor(){

    }
}