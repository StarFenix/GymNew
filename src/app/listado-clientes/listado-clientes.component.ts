import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<AngularFirestore>();
  constructor(private db: AngularFirestore ) { }

  ngOnInit(): void {
    /* this.db.collection('clientes').valueChanges().subscribe((resultado)=>{
      this.clientes = resultado;
      console.log(resultado)
    }); */
    this.clientes.length = 0;
    this.db.collection('clientes').get().subscribe((resultado) =>{
      console.log(resultado.docs)

      //Opcion 1
      resultado.docs.forEach((item: any)=>{
        let cliente = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        this.clientes.push(cliente)
      })
      //Opción 2
     /*  for(let item of resultado.docs){
        console.log(item.data())
        console.log(item.ref)
      } */
    })
  }

}
