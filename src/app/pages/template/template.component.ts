import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: ''
  };

  paises: any[] = [];

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {

    this.paisService.getPaises()
        .subscribe( paises => {
          this.paises = paises;

          // Agrega un pais por defecto al principio del arreglo
          this.paises.unshift({
            nombre: '[Seleccione País]',
            codigo: ''
          });

        });

  }

  guardar( forma: NgForm ) {

    if ( forma.invalid ) {

      Object.values( forma.controls ).forEach( control => {

        control.markAsTouched();

      });

    }
  }
}
