import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor( private http: HttpClient ) { }

  getPaises() {

    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        // Este es el "MAP" de los "Reactive Extensions" que transforma la data
        map((resp: any[]) =>
            // Éste otro map es el método de los arreglos de JS.
            // Éste map toma un arreglo base y crea otro con los datos especificados
           resp.map( pais => ({ nombre: pais.name, codigo: pais.alpha3Code })
          )
        )
      );

  }
}
