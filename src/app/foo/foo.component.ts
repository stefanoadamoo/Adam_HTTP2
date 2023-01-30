import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Foo } from './foo.model';

@Component({
  selector: 'app-foo',
  templateUrl: './foo.component.html',
  styleUrls: ['./foo.component.css']
})
export class FooComponent {
  loading: boolean;
  data: Object;
  o :Observable<Object>;
  fooData : Foo[];
  oFoo : Observable<Foo[]>;

  constructor(public http: HttpClient) {

  }

  makeRequest(): void {
    //Notifichiamo che stiamo attendendo dei dati
    this.loading = true; 
    //Facciamo una get e otteniamo l'oggetto Observable che attende la risposta
    this.o = this.http.get('https://my-json-server.typicode.com/PaoloCarugati/dischi/records/1');
    //Attacchiamo all'Observable o un metodo "observer" che verrà lanciato quando arriva la 
    //risposta
    this.o.subscribe(this.getData);
  }

  //Il metodo che notifica la risposta (nota che usiamo una "arrow function")
  getData = (d : Object) =>
  {
    this.data = d; //Notifico l’oggetto ricevuto dal server
    this.loading = false;  // Notifico che ho ricevuto i dati
  }

   //Nota bene, questo è un metodo alternativo e compatto per fare la stessa         
   //cosa di makeRequest senza dichiarare la variabile Observable e creando
   //l’arrow function direttamente dentro il metodo subscribe
   makeCompactRequest(): void {
    this.loading = true;
    this.http
      .get('https://my-json-server.typicode.com/PaoloCarugati/dischi/records/1')
      .subscribe(d => {
        this.data = d;
        this.loading = false;
      });
   }


  //L'operazione di post necessita un parametro in più.
  //Viene creata una stringa (JSON.strigify) a partire da un oggetto Typescript
  makeCompactPost(): void {
    this.loading = true;
    this.http
      .post('https://my-json-server.typicode.com/PaoloCarugati/dischi/records',
        JSON.stringify({
          "id": 5,
          "title": "Storia di un minuto",
          "artist": "PFM",
          "year": 1972,
          "company": "Numero Uno"      
        })
      )
      .subscribe(d => {
        this.data = d;
        this.loading = false;
      });
  }   

  makeTypedRequest() : void
  {
    //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe 
    this.oFoo = this.http.get<Foo[]>('https://my-json-server.typicode.com/PaoloCarugati/dischi/records');
    this.oFoo.subscribe(d => {this.fooData = d;});
  }  
}
